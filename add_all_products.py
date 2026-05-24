import os
import json
import requests
import re
import csv
from PIL import Image
import imagehash
from io import BytesIO

def parse_price(price_str):
    if not price_str: return 0.0
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

def download_and_save_images(urls, p_id, output_dir, seen_hashes):
    unique_images = []
    img_count = 0
    
    # Prioritize non-thumbnail URLs and upgrade resolution
    best_urls = []
    for url in urls:
        if not url or 'http' not in url: continue
        # Upgrade Sodimac/Leroy URLs to high res
        if 'sodimacBR' in url:
            url = re.sub(r'/w=\d+,h=\d+.*', '/public', url)
            if url not in best_urls: best_urls.append(url)
        elif 'leroymerlin' in url:
            url = re.sub(r'_\d+x\d+\.(jpg|jpeg|png)', '_1800x1800.\\1', url)
            if url not in best_urls: best_urls.append(url)
        else:
            if url not in best_urls: best_urls.append(url)

    for img_url in best_urls:
        if img_count >= 5: break
        try:
            headers = {'User-Agent': 'Mozilla/5.0'}
            resp = requests.get(img_url, headers=headers, timeout=15)
            if resp.status_code == 200:
                content = resp.content
                h = get_image_hash(content)
                if h is None: continue
                
                is_duplicate = False
                for existing_h in seen_hashes:
                    if h - existing_h <= 5:
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
        except:
            pass
    return unique_images

def process():
    output_dir = 'public/produtos'
    os.makedirs(output_dir, exist_ok=True)
    all_final_products = []
    seen_hashes = []

    # 1. Process input_products.tsv (Showers - IDs 24-32)
    with open('input_products.tsv', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        headers = [h.strip() for h in lines[0].split('\t')]
        for i, line in enumerate(lines[1:]):
            vals = line.split('\t')
            row = {headers[j]: vals[j].strip() for j in range(len(headers)) if j < len(vals)}
            p_id = 24 + i
            name = row.get('Nome do Produto', '')
            brand = "Lorenzetti" if "Lorenzetti" in name or "Bella" in name or "Ducha" in name else "Genérico"
            ean = row.get('EAN/GTIN', '')
            sale_price = parse_price(row.get('Preço', '0'))
            
            image_urls = []
            for j in range(1, 6):
                u = row.get(f'Imagem {j}', '')
                if u: image_urls.append(u)
            
            images = download_and_save_images(image_urls, p_id, output_dir, seen_hashes)
            if not images: continue

            all_final_products.append({
                "id": str(p_id),
                "name": name.replace(" Lorenzetti", ""),
                "brand": brand,
                "ean": ean,
                "image": images[0],
                "gallery": images,
                "originalPrice": round(sale_price * 1.25, 2),
                "salePrice": sale_price,
                "categories": ["banheiro", "chuveiro"],
                "intro": f"O {name} oferece a melhor experiência em banho com tecnologia e economia.",
                "details": f"O {name} da {brand} é reconhecido por sua durabilidade e design moderno. Ideal para quem busca conforto e praticidade no dia a dia.",
                "benefits": ["Fácil instalação", "Economia de energia", "Controle de temperatura", "Alta durabilidade"]
            })

    # 2. Process data.csv (New products - IDs 84 onwards)
    with open('data.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            p_id = 84 + i
            name = row.get('Nome do Produto', '')
            sale_price = parse_price(row.get('Preço', '0'))
            ean = row.get('EAN/GTIN', '')
            
            image_urls = [row.get(f'Imagem {j}', '') for j in range(1, 4)]
            if row.get('Todas as Imagens'):
                image_urls.extend(row.get('Todas as Imagens').split('|'))
            
            images = download_and_save_images(image_urls, p_id, output_dir, seen_hashes)
            if not images: continue

            # Determine category
            cat = ["area-externa"]
            if "Carrinho de Mão" in name: cat = ["area-externa"]
            elif "Bomba" in name: cat = ["caixa-dagua"]
            elif "Lavadora" in name: cat = ["area-externa"]
            elif "Furadeira" in name or "Jogo de Ferramentas" in name: cat = ["ferramentas", "ferramentas-manuais" if "Jogo" in name else "ferramentas-eletricas"]
            
            brand = "Tramontina" if "Tramontina" in name else ("Kärcher" if "Kärcher" in name else ("Bosch" if "Bosch" in name else "Vonder"))
            
            all_final_products.append({
                "id": str(p_id),
                "name": name,
                "brand": brand,
                "ean": ean,
                "image": images[0],
                "gallery": images,
                "originalPrice": round(sale_price * 1.25, 2),
                "salePrice": sale_price,
                "categories": cat,
                "intro": row.get('Descrição Completa', '').split('.')[0] + '.',
                "details": row.get('Especificações', '').replace('|', '\n'),
                "benefits": [b.strip() for b in row.get('Descrição Completa', '').split('.') if len(b) > 20][:5]
            })

    # Save everything to a JSON for final update
    with open('full_import.json', 'w', encoding='utf-8') as f:
        json.dump(all_final_products, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    process()