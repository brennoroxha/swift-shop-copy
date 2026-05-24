import fs from 'fs';

const fullImport = JSON.parse(fs.readFileSync('full_import.json', 'utf8'));

// 1. Update src/data/products.ts
let productsContent = fs.readFileSync('src/data/products.ts', 'utf8');
fullImport.forEach(p => {
  const productEntry = `  {
    id: "${p.id}",
    name: "${p.name}",
    brand: "${p.brand}",
    ean: "${p.ean}",
    image: "${p.image}",
    originalPrice: ${p.originalPrice},
    salePrice: ${p.salePrice},
    installments: 10,
    categories: ${JSON.stringify(p.categories)},
  },`;

  // Check if product already exists
  const regex = new RegExp(`\\{\\s*id:\\s*"${p.id}"[\\s\\S]*?\\},`, 'm');
  if (regex.test(productsContent)) {
    productsContent = productsContent.replace(regex, productEntry);
  } else {
    // Add to the end of the array
    productsContent = productsContent.replace(/\];\s*export const getProductsByCategory/, `${productEntry}\n];\n\nexport const getProductsByCategory`);
  }
});
fs.writeFileSync('src/data/products.ts', productsContent);

// 2. Update src/data/productImages.ts
let imagesContent = fs.readFileSync('src/data/productImages.ts', 'utf8');
fullImport.forEach(p => {
  const imagesEntry = `  "${p.id}": ${JSON.stringify(p.gallery)},`;
  const regex = new RegExp(`\\s*"${p.id}":\\s*\\[[\\s\\S]*?\\],`, 'm');
  if (regex.test(imagesContent)) {
    imagesContent = imagesContent.replace(regex, `\n${imagesEntry}`);
  } else {
    imagesContent = imagesContent.replace(/\};\s*$/, `\n${imagesEntry}\n};`);
  }
});
fs.writeFileSync('src/data/productImages.ts', imagesContent);

// 3. Update src/data/productDescriptions.ts
let descContent = fs.readFileSync('src/data/productDescriptions.ts', 'utf8');
fullImport.forEach(p => {
  const descEntry = `  "${p.id}": {
    title: "${p.name}",
    intro: "${p.intro.replace(/"/g, '\\"')}",
    details: "${p.details.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
    benefits: ${JSON.stringify(p.benefits)},
  },`;
  const regex = new RegExp(`\\s*"${p.id}":\\s*\\{[\\s\\S]*?\\},`, 'm');
  if (regex.test(descContent)) {
    descContent = descContent.replace(regex, `\n${descEntry}`);
  } else {
    descContent = descContent.replace(/\};\s*$/, `\n${descEntry}\n};`);
  }
});
fs.writeFileSync('src/data/productDescriptions.ts', descContent);

console.log(`Updated ${fullImport.length} products.`);