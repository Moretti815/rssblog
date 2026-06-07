import pandas
import requests
from io import StringIO

def fetch_csv(url):
    """Fetch CSV with error handling"""
    response = requests.get(url, timeout=10)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch {url}: Status {response.status_code}")
    # Check if content is HTML (error page)
    content_type = response.headers.get('content-type', '').lower()
    if 'text/html' in content_type:
        raise Exception(f"Failed to fetch {url}: Got HTML instead of CSV")
    return pandas.read_csv(StringIO(response.text), encoding="utf-8")

def fetch_xml(url):
    """Fetch XML with error handling"""
    response = requests.get(url, timeout=10)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch {url}: Status {response.status_code}")
    return response.text

FETCH_METHOD = {
    "csv": fetch_csv,
    "xml": fetch_xml
}

def fetch(url, type="csv"):
    return FETCH_METHOD[type](url)