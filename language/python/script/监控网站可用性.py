import requests
import time
import smtplib
from email.mime.text import MIMEText

def check_website(url, check_interval=60):
    while True:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print(f"{url} is up!")
            else:
                send_alert(f"{url} returned status code {response.status_code}")

        except requests.RequestException:
            send_alert(f"Failed to connect to {url}")

        time.sleep(check_interval)

def send_alert(message):
    sender = "your_email@example.com"
    receiver = "admin@example.com"
    password = "your_password"

    msg = MIMEText(message)
    msg['Subject'] = "Website Alert"
    msg['From'] = sender
    msg['To'] = receiver

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender, password)
        server.sendmail(sender, receiver, msg.as_string())

check_website("https://www.example.com")
