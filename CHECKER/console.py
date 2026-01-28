import boto3
import urllib.parse
import urllib.request
import json

FEDERATION_URL = "https://signin.aws.amazon.com/federation?Action=getSigninToken&%s"
SIGNIN_URL = "https://signin.aws.amazon.com/federation?Action=login&Destination=https://console.aws.amazon.com&SigninToken=%s"


def get_federation_token(key, secret):
    try:
        client = boto3.client(
            'sts',
            aws_access_key_id=key,
            aws_secret_access_key=secret,
            region_name='us-east-1'
        )
        response = client.get_federation_token(
            Name='admin',
            Policy=json.dumps({
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "Stmt1",
                        "Effect": "Allow",
                        "Action": "*",
                        "Resource": "*"
                    }
                ]
            }),
            DurationSeconds=43200
        )['Credentials']
        return {
            "sessionId": response['AccessKeyId'],
            "sessionKey": response['SecretAccessKey'],
            "sessionToken": response['SessionToken']
        }
    except Exception as e:
        print("Error during federation token retrieval:", e)
        return None


def get_console_url_from_credentials(aws_credentials):
    try:
        key, secret = aws_credentials.strip().split('|')
        token = get_federation_token(key, secret)
        if token:
            url_data = urllib.parse.urlencode({"Session": json.dumps(token)})
            with urllib.request.urlopen(FEDERATION_URL % url_data) as res:
                token = json.loads(res.read().decode("utf-8"))["SigninToken"]
                return SIGNIN_URL % token, key, secret
    except Exception as e:
        print("Error generating console URL:", e)
    return None, None, None


def process_aws_credentials_file(file_path):
    try:
        with open(file_path, 'r') as file:
            aws_credentials_list = file.readlines()
            for aws_credentials in aws_credentials_list:
                console_url, key, secret = get_console_url_from_credentials(aws_credentials)
                if console_url:
                    print("AWS Console URL:", console_url)
                    print("AWS Access Key ID:", key)
                    print("AWS Secret Access Key:", secret)
                    print()
                    
                    # Save to file
                    with open("aws_login_info.txt", "a") as f:
                        f.write(f"AWS Console URL: {console_url}\n")
                        f.write(f"AWS Access Key ID: {key}\n")
                        f.write(f"AWS Secret Access Key: {secret}\n\n")
                else:
                    print("Failed to generate console URL for the given AWS credentials.")
    except Exception as e:
        print("Error processing credentials file:", e)


if __name__ == '__main__':
    mode = input("Pilih metode input (1 = dari file, 2 = input manual): ").strip()
    
    if mode == '1':
        file_path = input("Masukkan path ke file kredensial AWS: ")
        process_aws_credentials_file(file_path)
    elif mode == '2':
        key = input("Masukkan AWS Access Key ID: ").strip()
        secret = input("Masukkan AWS Secret Access Key: ").strip()
        aws_credentials = f"{key}|{secret}"
        console_url, key, secret = get_console_url_from_credentials(aws_credentials)
        if console_url:
            print("AWS Console URL:", console_url)
            print("AWS Access Key ID:", key)
            print("AWS Secret Access Key:", secret)
            
            # Simpan ke file
            with open("aws_login_info.txt", "a") as f:
                f.write(f"AWS Console URL: {console_url}\n")
                f.write(f"AWS Access Key ID: {key}\n")
                f.write(f"AWS Secret Access Key: {secret}\n\n")
        else:
            print("Gagal menghasilkan URL AWS Console.")
    else:
        print("Pilihan tidak valid.")
