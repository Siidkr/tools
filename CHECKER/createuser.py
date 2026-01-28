import boto3
from botocore.exceptions import ClientError

# Membuat client untuk IAM
iam_client = boto3.client('iam')

def create_iam_user_with_admin_access_and_console_login(username, password):
    try:
        # Membuat pengguna IAM
        print(f'Membuat pengguna IAM: {username}')
        user = iam_client.create_user(
            UserName=username
        )

        # Memberikan permission AdministratorAccess
        iam_client.attach_user_policy(
            UserName=username,
            PolicyArn='arn:aws:iam::aws:policy/AdministratorAccess'
        )
        print(f'AdministratorAccess telah diberikan ke {username}')

        # Menetapkan password untuk login ke AWS Console
        iam_client.create_login_profile(
            UserName=username,
            Password=password,
            PasswordResetRequired=False  # Tidak perlu reset password saat login pertama kali
        )
        print(f'Password telah diberikan untuk {username}. Password: {password}')

        # Membuat URL login AWS Console untuk pengguna tersebut
        account_id = boto3.client('sts').get_caller_identity().get('Account')
        console_url = f"https://{account_id}.signin.aws.amazon.com/console"
        email = f"{username}@{account_id}.iam.aws"
        print(f'Link login AWS Console untuk {username}: {console_url}')
        print(f"Pengguna dapat login menggunakan email IAM ({email}) dan password yang diberikan.")

        # Menyimpan informasi ke file .txt
        info = f"""
        Username IAM: {username}
        Password: {password}
        Link Login AWS Console: {console_url}
        Email IAM: {email}
        """

        # Menyimpan informasi ke file .txt
        with open(f"{username}_aws_user_info.txt", "w") as file:
            file.write(info)
        print(f"Informasi pengguna telah disimpan ke file {username}_aws_user_info.txt")

        return user
    except ClientError as e:
        print(f'Error: {e}')
        return None

# Input username dan password dari pengguna
username = input("Masukkan username untuk pengguna IAM baru: ")
password = input("Masukkan password untuk pengguna IAM baru: ")

create_iam_user_with_admin_access_and_console_login(username, password)
