import re
from collections import Counter

def analyze_log(log_file):
    ip_pattern = r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}'
    with open(log_file, 'r') as f:
        log_content = f.read()

    ip_addresses = re.findall(ip_pattern, log_content)
    ip_counts = Counter(ip_addresses)

    print("Top 5 IP addresses:")
    for ip, count in ip_counts.most_common(5):
        print(f"{ip}: {count} times")

analyze_log('server.log')
