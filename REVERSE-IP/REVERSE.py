import re
import requests
import time
import random
import queue
import threading
import urllib3
import argparse
import socket
import sys
from typing import Dict, List, Optional, Tuple
from concurrent.futures import ThreadPoolExecutor

# Color codes for terminal output
class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'
    
    @staticmethod
    def red(text): return f"{Colors.RED}{text}{Colors.END}"
    @staticmethod
    def green(text): return f"{Colors.GREEN}{text}{Colors.END}"
    @staticmethod
    def yellow(text): return f"{Colors.YELLOW}{text}{Colors.END}"
    @staticmethod
    def blue(text): return f"{Colors.BLUE}{text}{Colors.END}"
    @staticmethod
    def magenta(text): return f"{Colors.MAGENTA}{text}{Colors.END}"
    @staticmethod
    def cyan(text): return f"{Colors.CYAN}{text}{Colors.END}"
    @staticmethod
    def white(text): return f"{Colors.WHITE}{text}{Colors.END}"
    @staticmethod
    def bold(text): return f"{Colors.BOLD}{text}{Colors.END}"

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Initialize queues and progress tracking
target_queue = queue.Queue()
proxy_queue = queue.Queue()
result_queue = queue.Queue()
display_lock = threading.Lock()


def print_banner():
    """Print a nice ASCII art banner for the tool."""
    banner = f"""
{Colors.cyan('██████╗ ███████╗██╗   ██╗███████╗██████╗ ███████╗███████╗')}
{Colors.cyan('██╔══██╗██╔════╝██║   ██║██╔════╝██╔══██╗██╔════╝██╔════╝')}
{Colors.cyan('██████╔╝█████╗  ██║   ██║█████╗  ██████╔╝███████╗█████╗  ')}
{Colors.cyan('██╔══██╗██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║██╔══╝  ')}
{Colors.cyan('██║  ██║███████╗ ╚████╔╝ ███████╗██║  ██║███████║███████╗')}
{Colors.cyan('╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝')}

{Colors.magenta('██╗      ██████╗  ██████╗ ██╗  ██╗██╗   ██╗██████╗ ')}
{Colors.magenta('██║     ██╔═══██╗██╔═══██╗██║ ██╔╝██║   ██║██╔══██╗')}
{Colors.magenta('██║     ██║   ██║██║   ██║█████╔╝ ██║   ██║██████╔╝')}
{Colors.magenta('██║     ██║   ██║██║   ██║██╔═██╗ ██║   ██║██╔═══╝ ')}
{Colors.magenta('███████╗╚██████╔╝╚██████╔╝██║  ██╗╚██████╔╝██║     ')}
{Colors.magenta('╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ')}

    {Colors.bold(Colors.white('Mixed IP & Domain Reconnaissance Tool v2.0'))}
    {Colors.yellow('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}
    """
    print(banner)


def log_processing(target: str, target_type: str, status: str, count: Optional[int] = None):
    """Thread-safe logging of processing status."""
    with display_lock:
        timestamp = time.strftime("%H:%M:%S")
        
        if target_type == "ip":
            type_icon = "🌐"
            type_color = Colors.blue
        else:
            type_icon = "📡"
            type_color = Colors.magenta
        
        if status == "processing":
            status_text = Colors.yellow("PROCESSING")
            print(f"[{Colors.cyan(timestamp)}] {type_icon} {type_color(target_type.upper())} {Colors.white(target)} - {status_text}")
        elif status == "success":
            status_text = Colors.green("SUCCESS")
            count_text = Colors.white(f"({count} domains)") if count else ""
            print(f"[{Colors.cyan(timestamp)}] {type_icon} {type_color(target_type.upper())} {Colors.white(target)} - {status_text} {count_text}")
        elif status == "failed":
            status_text = Colors.red("FAILED")
            print(f"[{Colors.cyan(timestamp)}] {type_icon} {type_color(target_type.upper())} {Colors.white(target)} - {status_text}")


def format_proxy(address: str) -> Dict[str, str]:
    """Format a proxy address for use with requests library."""
    clean_address = address.strip()
    return {
        "http": f"http://{clean_address}",
        "https": f"http://{clean_address}",
    }


def extract_domains_from_response(response_text: str) -> List[str]:
    """Extract only domain names from the API response."""
    domains = []
    lines = response_text.strip().split('\n')
    
    for line in lines:
        # Skip empty lines and comments
        if not line.strip() or line.startswith('#'):
            continue
            
        # Split by comma if it's CSV format
        parts = line.strip().split(',')
        
        # The domain is usually the first column in the CSV response
        if parts and parts[0].strip():
            domain = parts[0].strip()
            # Basic validation to ensure it looks like a domain
            if '.' in domain and not domain.startswith('http') and ' ' not in domain:
                # Remove quotes if present
                domain = domain.strip('"').strip("'")
                domains.append(domain)
    
    # Remove duplicates while preserving order
    seen = set()
    unique_domains = []
    for domain in domains:
        if domain not in seen:
            seen.add(domain)
            unique_domains.append(domain)
    
    return unique_domains


def is_valid_ip(address: str) -> bool:
    """Check if the given string is a valid IP address."""
    try:
        socket.inet_aton(address)
        return True
    except socket.error:
        return False


def is_valid_domain(domain: str) -> bool:
    """Check if the given string is a valid domain name."""
    # Basic domain regex pattern
    domain_pattern = r'^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$'
    return bool(re.match(domain_pattern, domain))


def load_targets(filepath: str) -> Tuple[List[str], List[str]]:
    """Load targets from file and separate IPs from domains."""
    try:
        with open(filepath, "r") as file:
            lines = [line.strip() for line in file.read().splitlines() if line.strip()]
        
        ips = []
        domains = []
        invalid_targets = []
        
        for line in lines:
            if is_valid_ip(line):
                ips.append(line)
            elif is_valid_domain(line):
                domains.append(line)
            else:
                invalid_targets.append(line)
        
        print(f"{Colors.cyan('📊 Loaded from')} {Colors.white(filepath)}:")
        print(f"   {Colors.blue('📍 IP addresses:')} {Colors.green(str(len(ips)))}")
        print(f"   {Colors.magenta('🌐 Domain names:')} {Colors.green(str(len(domains)))}")
        if invalid_targets:
            print(f"   {Colors.yellow('⚠️  Invalid targets (skipped):')} {Colors.red(str(len(invalid_targets)))}")
            if len(invalid_targets) <= 3:
                for invalid in invalid_targets:
                    print(f"      {Colors.red('❌')} {Colors.white(invalid)}")
            else:
                for invalid in invalid_targets[:3]:
                    print(f"      {Colors.red('❌')} {Colors.white(invalid)}")
                print(f"      {Colors.yellow('... and')} {Colors.red(str(len(invalid_targets) - 3))} {Colors.yellow('more')}")
        
        return ips, domains
        
    except FileNotFoundError:
        print(f"Error: File '{filepath}' not found.")
        return [], []
    except Exception as e:
        print(f"Error loading targets from {filepath}: {e}")
        return [], []


def get_ip_count(ip: str, proxy: Dict[str, str], retry_count: int = 0) -> Optional[int]:
    """Get the count of subdomains for an IP using reverse IP lookup."""
    max_retries = 2
    try:
        resp = requests.get(
            f"https://ip.thc.org/{ip}",
            timeout=30,
            verify=False,
            proxies=proxy,
        )
        if "We could not find any subdomains for the given domain" in resp.text:
            return None

        entry_matches = re.findall(r";Entries: \d+/(\d+)", resp.text)
        if entry_matches:
            return int(entry_matches[0])

        if retry_count < max_retries:
            time.sleep(random.uniform(2, 5))
            return get_ip_count(ip, proxy, retry_count + 1)
        return None
    except Exception as e:
        if retry_count < max_retries:
            time.sleep(random.uniform(2, 5))
            return get_ip_count(ip, proxy, retry_count + 1)
        return None


def get_domain_count(domain: str, proxy: Dict[str, str], retry_count: int = 0) -> Optional[int]:
    """Get the count of subdomains for a domain using subdomain enumeration."""
    max_retries = 2
    try:
        resp = requests.get(
            f"https://ip.thc.org/sb/{domain}",
            timeout=30,
            verify=False,
            proxies=proxy,
        )
        if "We could not find any subdomains for the given domain" in resp.text:
            return None

        entry_matches = re.findall(r";Entries: \d+/(\d+)", resp.text)
        if entry_matches:
            return int(entry_matches[0])

        if retry_count < max_retries:
            time.sleep(random.uniform(2, 5))
            return get_domain_count(domain, proxy, retry_count + 1)
        return None
    except Exception as e:
        if retry_count < max_retries:
            time.sleep(random.uniform(2, 5))
            return get_domain_count(domain, proxy, retry_count + 1)
        return None


def download_ip_results(ip: str, limit: int, proxy: Dict[str, str], output_file: str, retry_count: int = 0) -> bool:
    """Download subdomain results for an IP using reverse IP lookup."""
    max_retries = 2
    try:
        url = f"https://ip.thc.org/api/v1/download?ip_address={ip}&limit={limit}&hide_header=true"
        response = requests.get(url, timeout=45, verify=False, proxies=proxy)

        if response.status_code == 200:
            # Extract only domains/URLs from the response
            domains = extract_domains_from_response(response.text)
            if domains:
                with open(output_file, "a") as file:
                    for domain in domains:
                        file.write(f"{domain}\n")
            return True

        if retry_count < max_retries:
            time.sleep(random.uniform(2, 5))
            return download_ip_results(ip, limit, proxy, output_file, retry_count + 1)
        return False
    except Exception as e:
        if retry_count < max_retries:
            time.sleep(random.uniform(2, 5))
            return download_ip_results(ip, limit, proxy, output_file, retry_count + 1)
        return False


def download_domain_results(domain: str, limit: int, proxy: Dict[str, str], output_file: str, retry_count: int = 0) -> bool:
    """Download subdomain results for a domain using subdomain enumeration."""
    max_retries = 2
    try:
        url = f"https://ip.thc.org/api/v1/subdomains/download?domain={domain}&limit={limit}&hide_header=true"
        response = requests.get(url, timeout=45, verify=False, proxies=proxy)

        if response.status_code == 200:
            # Extract only domains/URLs from the response
            domains = extract_domains_from_response(response.text)
            if domains:
                with open(output_file, "a") as file:
                    for domain in domains:
                        file.write(f"{domain}\n")
            return True

        if retry_count < max_retries:
            time.sleep(random.uniform(2, 5))
            return download_domain_results(domain, limit, proxy, output_file, retry_count + 1)
        return False
    except Exception as e:
        if retry_count < max_retries:
            time.sleep(random.uniform(2, 5))
            return download_domain_results(domain, limit, proxy, output_file, retry_count + 1)
        return False


def proxy_manager():
    """Manage the proxy rotation."""
    # Use hardcoded proxy
    proxy_address = "121a89474789baf146d2:2fd5029b9bd0a4ba@gw.dataimpulse.com:823"
    formatted_proxy = {
        "http": f"http://{proxy_address}",
        "https": f"http://{proxy_address}",
    }
    proxies = [formatted_proxy]

    # Add all proxies to the queue
    for proxy in proxies:
        proxy_queue.put(proxy)

    # Keep track of proxies in use
    in_use = set()

    def get_proxy():
        # If no proxies available, wait until one is returned
        while proxy_queue.empty() and in_use:
            time.sleep(0.1)

        if proxy_queue.empty():
            return None

        proxy = proxy_queue.get()
        in_use.add(id(proxy))
        return proxy

    def return_proxy(proxy):
        if id(proxy) in in_use:
            in_use.remove(id(proxy))
        proxy_queue.put(proxy)

    return get_proxy, return_proxy


def worker(output_file: str):
    """Worker function to process targets from the queue."""
    get_proxy, return_proxy = proxy_manager()

    while not target_queue.empty():
        try:
            target, target_type = target_queue.get(timeout=1)
        except queue.Empty:
            break

        proxy = get_proxy()
        if not proxy:
            target_queue.put((target, target_type))
            time.sleep(1)
            continue

        try:
            # Log processing start
            log_processing(target, target_type, "processing")
            
            count = None
            success = False
            
            if target_type == "ip":
                # Process IP address (reverse IP lookup)
                count = get_ip_count(target, proxy)
                time.sleep(random.uniform(2, 4))
                
                if count is not None:
                    success = download_ip_results(target, count, proxy, output_file)
                    result_queue.put((target, count, success, "ip"))
                else:
                    result_queue.put((target, None, False, "ip"))
                    
            elif target_type == "domain":
                # Process domain (subdomain enumeration)
                count = get_domain_count(target, proxy)
                time.sleep(random.uniform(2, 4))
                
                if count is not None:
                    success = download_domain_results(target, count, proxy, output_file)
                    result_queue.put((target, count, success, "domain"))
                else:
                    result_queue.put((target, None, False, "domain"))

            # Log result
            if success:
                log_processing(target, target_type, "success", count)
            else:
                log_processing(target, target_type, "failed")

            # Wait between targets
            time.sleep(random.uniform(2, 5))

        except Exception as e:
            target_queue.put((target, target_type))
            log_processing(target, target_type, "failed")
            result_queue.put((target, None, False, target_type))
        finally:
            return_proxy(proxy)
            target_queue.task_done()


def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description="Mixed Reverse IP and Domain lookup tool",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 reverse.py -list targets.txt
  python3 reverse.py --list mixed_targets.txt -threads 50
  python3 reverse.py -l targets.txt -o results.txt

Target file format:
  192.168.1.1
  8.8.8.8
  google.com
  github.com
  1.1.1.1
  facebook.com
        """
    )
    
    parser.add_argument(
        "-list", "-l", "--list",
        dest="target_file",
        required=True,
        help="Path to file containing list of IP addresses and domain names (one per line)"
    )
    
    parser.add_argument(
        "-threads", "-t",
        dest="threads",
        type=int,
        default=100,
        help="Number of worker threads (default: 100)"
    )
    
    parser.add_argument(
        "-output", "-o",
        dest="output_file",
        default="results.txt",
        help="Output file for results (default: results.txt)"
    )
    
    return parser.parse_args()


def main():
    # Parse command line arguments
    args = parse_arguments()
    
    print(f"=== Mixed Reverse Lookup Tool ===")
    print(f"Target File: {args.target_file}")
    print(f"Threads: {args.threads}")
    print(f"Output: {args.output_file}")
    print("=" * 40)
    
    # Load targets from specified file
    ips, domains = load_targets(args.target_file)
    total_targets = len(ips) + len(domains)
    
    if total_targets == 0:
        print("No valid targets found. Exiting.")
        return

    # Clear output file
    try:
        with open(args.output_file, "w") as f:
            f.write("")  # Clear the file completely
        print(f"Output file '{args.output_file}' cleared.")
    except Exception as e:
        print(f"Warning: Could not clear output file: {e}")

    # Add targets to queue with their types
    for ip in ips:
        target_queue.put((ip, "ip"))
    for domain in domains:
        target_queue.put((domain, "domain"))

    # Create and start worker threads
    num_workers = min(args.threads, total_targets)
    threads = []

    print(f"Starting {num_workers} worker threads to process {total_targets} targets")
    print(f"Processing: {len(ips)} IPs (reverse IP lookup) + {len(domains)} domains (subdomain enumeration)")

    for _ in range(num_workers):
        thread = threading.Thread(target=worker, args=(args.output_file,))
        thread.daemon = True
        thread.start()
        threads.append(thread)

    # Wait for all targets to be processed
    target_queue.join()

    # Process results
    successful_ips = 0
    failed_ips = 0
    successful_domains = 0
    failed_domains = 0

    while not result_queue.empty():
        target, count, success, target_type = result_queue.get()
        if target_type == "ip":
            if success:
                successful_ips += 1
            else:
                failed_ips += 1
        elif target_type == "domain":
            if success:
                successful_domains += 1
            else:
                failed_domains += 1

    print("\n" + "=" * 50)
    print("PROCESSING COMPLETE")
    print("=" * 50)
    print(f"IP Addresses:")
    print(f"  - Successfully processed: {successful_ips}")
    print(f"  - Failed: {failed_ips}")
    print(f"Domain Names:")
    print(f"  - Successfully processed: {successful_domains}")
    print(f"  - Failed: {failed_domains}")
    print(f"Total Success: {successful_ips + successful_domains}")
    print(f"Total Failed: {failed_ips + failed_domains}")
    print(f"Results saved to: {args.output_file} (domains only)")


def remove_duplicates_from_output(output_file: str):
    """Remove duplicate domains from the output file."""
    try:
        with open(output_file, "r") as f:
            domains = f.readlines()
        
        # Remove duplicates while preserving order
        seen = set()
        unique_domains = []
        for domain in domains:
            domain = domain.strip()
            if domain and domain not in seen:
                seen.add(domain)
                unique_domains.append(domain)
        
        # Write back unique domains
        with open(output_file, "w") as f:
            for domain in unique_domains:
                f.write(f"{domain}\n")
                
        print(f"{Colors.green('✅ Removed duplicates. Final unique domains:')} {Colors.white(str(len(unique_domains)))}")
        
    except Exception as e:
        print(f"{Colors.red('❌ Error removing duplicates:')} {Colors.white(str(e))}")


# Initialize target_queue here
target_queue = queue.Queue()


if __name__ == "__main__":
    main()
    
    # Remove duplicates after processing is complete
    if len(sys.argv) > 1:
        # Get output file from arguments
        args = parse_arguments()
        remove_duplicates_from_output(args.output_file)