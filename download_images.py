import re
import os
import requests
import time

def download_image(url, path):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            with open(path, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded: {url} -> {path}")
            return True
        else:
            print(f"Failed to download {url}: {response.status_code}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return False

file_path = 'supabase/functions/google-shopping-feed/index.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all product blocks
# Using a more robust regex for the block
product_blocks = re.findall(r'\{.*?id:\s*"(.*?)".*?image:\s*"(.*?)".*?imagens:\s*\[(.*?)\].*?\}', content, re.DOTALL)

for pid, main_image, gallery_str in product_blocks:
    # Handle main image
    main_path = f"public/produtos/produto-{pid}.jpg"
    download_image(main_image, main_path)
    
    # Handle gallery images
    gallery_urls = re.findall(r'"(https?://.*?)"', gallery_str)
    for i, g_url in enumerate(gallery_urls):
        g_path = f"public/produtos/produto-{pid}-{i}.jpg"
        download_image(g_url, g_path)
        time.sleep(0.5)

