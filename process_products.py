import os
import json
import requests
from PIL import Image
import imagehash
from io import BytesIO
import re

def parse_price(price_str):
    # R$ 127,00 -> 127.00
    cleaned = re.sub(r'[^\d,]', '', price_str).replace(',', '.')
    try:
        return float(cleaned)
    except:
        return 0.0

def get_image_hash(img_content):
    try:
        img = Image.open(BytesIO(img_content))
        return imagehash.phash(img)
    except:
        return None

def process():
    input_file = 'input_products.tsv'
    output_dir = 'public/produtos'
    os.makedirs(output_dir, exist_ok=True)
    
    products = []
    start_id = 24
    
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        if not lines: return
        headers = [h.strip() for h in lines[0].split('\t')]
        
        for i, line in enumerate(lines[1:]):
            if not line.strip(): continue
            vals = line.split('\t')
            row = {}
            for j, h in enumerate(headers):
                row[h] = vals[j].strip() if j < len(vals) else ""
            
            p_id = start_id + i
            name = row.get('Nome do Produto', '').strip()
            if not name: continue
            
            brand = "Lorenzetti"
            if "Lorenzetti" in name:
                name = name.replace(" Lorenzetti", "").strip()
            
            ean = row.get('EAN/GTIN', '').strip()
            sale_price = parse_price(row.get('Preço', '0'))
            original_price = round(sale_price * 1.25, 2)
            
            # Extract images
            raw_images_str = row.get('Todas as Imagens', '')
            if raw_images_str:
                raw_images = [img.strip() for img in raw_images_str.split('|')]
            else:
                raw_images = []
            
            for j in range(1, 6):
                img_val = row.get(f'Imagem {j}', '').strip()
                if img_val and img_val not in raw_images:
                    raw_images.append(img_val)
            
            unique_images = []
            seen_hashes = []
            
            view_groups = {}
            for url in raw_images:
                if not url or 'http' not in url: continue
                match = re.search(r'sodimacBR/([^/]+)', url)
                if match:
                    view_id = match.group(1).split('/')[0]
                    if view_id not in view_groups:
                        view_groups[view_id] = []
                    view_groups[view_id].append(url)
            
            best_urls = []
            for view_id, urls in view_groups.items():
                def url_priority(u):
                    score = 0
                    if '/public' in u: score += 10000
                    w_match = re.search(r'w=(\d+)', u)
                    if w_match: score += int(w_match.group(1))
                    return score
                
                urls.sort(key=url_priority, reverse=True)
                best_urls.append(urls[0])
            
            def main_sort(u):
                # Prefer URLs without underscores or with _0
                match = re.search(r'sodimacBR/([^/_]+)', u)
                if match and '_' not in match.group(1):
                    return 0
                return 1
            best_urls.sort(key=main_sort)

            img_count = 0
            for img_url in best_urls:
                try:
                    resp = requests.get(img_url, timeout=15)
                    if resp.status_code == 200:
                        content = resp.content
                        h = get_image_hash(content)
                        if h is None: continue
                        
                        is_duplicate = False
                        for existing_h in seen_hashes:
                            if h - existing_h <= 10:
                                is_duplicate = True
                                break
                        
                        if not is_duplicate:
                            seen_hashes.append(h)
                            filename = f"produto-{p_id}-{img_count}.jpg"
                            filepath = os.path.join(output_dir, filename)
                            
                            img = Image.open(BytesIO(content)).convert('RGB')
                            img.save(filepath, 'JPEG', quality=90)
                            
                            unique_images.append(f"/produtos/{filename}")
                            img_count += 1
                except Exception as e:
                    print(f"Error processing image {img_url}: {e}", file=os.sys.stderr)
            
            if not unique_images:
                continue
                
            products.append({
                "id": str(p_id),
                "name": name,
                "brand": brand,
                "ean": ean,
                "image": unique_images[0],
                "gallery": unique_images,
                "originalPrice": original_price,
                "salePrice": sale_price,
                "installments": 10,
                "categories": ["banheiro", "chuveiro"],
                "intro": f"O {name} oferece conforto e eficiência para o seu banho.",
                "benefits": [
                    "Design moderno e funcional",
                    "Fácil instalação",
                    "Economia de energia",
                    "Alta durabilidade"
                ]
            })
            
    print(json.dumps(products, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    process()
