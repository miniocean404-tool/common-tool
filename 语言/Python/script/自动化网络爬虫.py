import requests
from bs4 import BeautifulSoup

def scrape_quotes():
    url = "http://quotes.toscrape.com"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    quotes = []
    for quote in soup.find_all('span', class_='text'):
        quotes.append(quote.text)

    return quotes

quotes = scrape_quotes()
for i, quote in enumerate(quotes, 1):
    print(f"{i}. {quote}")
