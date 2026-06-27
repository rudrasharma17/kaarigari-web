import urllib.request
import re

url = "https://drive.google.com/drive/folders/1UgiYcNqHVxGR3wSWOgBKTjR3AHBOWPgr?usp=sharing"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    ids = re.findall(r'\["([a-zA-Z0-9_-]{28,})"', html)
    print("Found IDs:", list(set(ids)))
except Exception as e:
    print("Error:", e)
