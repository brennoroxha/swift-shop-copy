const urls = [
  "https://www.leroymerlin.com.br/escada-aluminio-5-degraus-1,53m-120kg-prata-e-vermelho-reisam_91713286",
  "https://www.leroymerlin.com.br/escada-articulada-4x4-16-degraus-em-aluminio-4,48m-reisam_90927781",
  "https://www.leroymerlin.com.br/escada-aluminio-3-degraus-1,08m-120kg-prata-e-vermelho-reisam_91713272",
  "https://www.leroymerlin.com.br/escada-extensivel-15x2-30-degraus-em-aluminio-7,66m-botafogo_89961746",
  "https://www.leroymerlin.com.br/escada-articulada-4x3-12-degraus-em-aluminio-3,4m-reisam_90927774",
  "https://www.leroymerlin.com.br/escada-articulada-4x4-16-degraus-em-aluminio-4,23m-botafogo_89961683",
  "https://www.leroymerlin.com.br/escada-de-aluminio-dupla-5-degraus-natural-120kg-reisam_91839734",
  "https://www.leroymerlin.com.br/escada-domestica-aluminio-4-degraus-natural-120-kg-reisam_91836990",
  "https://www.leroymerlin.com.br/escada-domestica-aluminio-7-degraus-natural-120-kg-reisam_91837025",
  "https://www.leroymerlin.com.br/escada-extensivel-9x2-18-degraus-em-aluminio-4,44m-botafogo_89961704"
];

const results = {};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchImages(url) {
  const productId = url.split('_').pop();
  console.error(`Fetching ${url}...`);
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
      }
    });
    const html = await response.text();
    
    // Regex to find image URLs
    const regex = /https:\/\/cdn\.leroymerlin\.com\.br\/products\/[^"\\ ]+/g;
    const matches = html.match(regex) || [];
    
    // Clean and normalize URLs
    const processedImages = matches
      .map(img => img.split('\\')[0].split('?')[0]) // Remove backslashes and query params
      .filter(img => img.match(/(_[0-9]+x[0-9]+\.(jpg|jpeg|png))$/))
      .map(img => img.replace(/_[0-9]+x[0-9]+\.(jpg|jpeg|png)$/, '_1800x1800.$1'))
      .filter((value, index, self) => self.indexOf(value) === index);

    results[productId] = processedImages.slice(0, 10);
    console.error(`Found ${results[productId].length} images for ${productId}`);
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    results[productId] = [];
  }
}

async function run() {
  for (const url of urls) {
    await fetchImages(url);
    await sleep(1000); // 1 second delay
  }
  console.log(JSON.stringify(results, null, 2));
}

run();
