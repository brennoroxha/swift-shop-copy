import fs from 'fs';

const newProductsTs = fs.readFileSync('ts_products.txt', 'utf8');
const newImagesTs = fs.readFileSync('ts_images.txt', 'utf8');
const newDescTs = fs.readFileSync('ts_descriptions.txt', 'utf8');

// Update products.ts
let productsContent = fs.readFileSync('src/data/products.ts', 'utf8');
const product24Start = productsContent.indexOf('  {\n    id: "24"');
if (product24Start !== -1) {
    const endOfArray = productsContent.indexOf('];', product24Start);
    productsContent = productsContent.substring(0, product24Start) + newProductsTs + productsContent.substring(endOfArray);
} else {
    // Fallback if 24 not found
    productsContent = productsContent.replace('];\n\nexport const getProductsByCategory', newProductsTs + '];\n\nexport const getProductsByCategory');
}
fs.writeFileSync('src/data/products.ts', productsContent);

// Update productImages.ts
let imagesContent = fs.readFileSync('src/data/productImages.ts', 'utf8');
const image24Start = imagesContent.indexOf('  "24": [');
if (image24Start !== -1) {
    imagesContent = imagesContent.substring(0, image24Start) + newImagesTs + '};';
} else {
    imagesContent = imagesContent.replace('};', newImagesTs + '};');
}
fs.writeFileSync('src/data/productImages.ts', imagesContent);

// Update productDescriptions.ts
let descContent = fs.readFileSync('src/data/productDescriptions.ts', 'utf8');
const desc24Start = descContent.indexOf('  "24": {');
if (desc24Start !== -1) {
    descContent = descContent.substring(0, desc24Start) + newDescTs + '};';
} else {
    descContent = descContent.replace('};', newDescTs + '};');
}
fs.writeFileSync('src/data/productDescriptions.ts', descContent);
