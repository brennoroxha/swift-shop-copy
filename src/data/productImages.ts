// Additional gallery images per product (external URLs from original site)
// The first image is always the local imported image (from products.ts)
// These are the EXTRA gallery images shown on the product detail page

const BASE = "https://rochepossay.shop/wp-content/uploads/2025/05/";

export const productGalleryImages: Record<string, string[]> = {
  // 1 - Effaclar Ultra Concentrado
  "1": [
    `${BASE}imagem-serum-effaclar-ultra-concentrado-modo-de-usar-600x600.webp`,
    `${BASE}imagem-serum-effaclar-ultra-concentrado-eficacia-600x600.webp`,
    `${BASE}imagem-serum-effaclar-ultra-concentrado-descritivo-600x600.webp`,
  ],
  // 2 - Pure Niacinamide 10
  "2": [
    `${BASE}la-roche-posay-niamicide-10-1-600x600.jpg`,
    `${BASE}la-roche-posay-niamicide-10-2-600x600.jpg`,
    `${BASE}la-roche-posay-niamicide-10-3-600x600.jpg`,
    `${BASE}la-roche-posay-niamicide-10-4-600x600.jpg`,
  ],
  // 3 - Salicyli C10
  "3": [
    `${BASE}e031171c-a3fe-4112-8935-048771fd3b73-la-rocheposay-salicyli-c10-antiidade-30ml-600x600.png`,
    `${BASE}be57e2a5-396b-4b0f-8f45-bab99d51d9d5-la-rocheposay-salicyli-c10-antiidade-30ml-600x600.png`,
    `${BASE}618d8de6-74c8-4df6-82c9-7228cbb6b3a2-la-rocheposay-salicyli-c10-antiidade-30ml-600x600.png`,
  ],
  // 4 - Hyalu B5 Repair Sérum
  "4": [
    `${BASE}1-1-600x600.jpg`,
    `${BASE}1-4-600x600.webp`,
    `${BASE}1-3-600x600.webp`,
    `${BASE}HYALU-B5-SERUM-2-600x600.jpg`,
  ],
  // 5 - Kit 2 Lipikar
  "5": [
    `${BASE}470a72f0-ade2-4d8f-b5c6-4ca6808dfff9-la-rocheposay-lipikar-baume-ap-m-hidratante-corporal-400ml_23837b13-16a3-4335-be4f-03dc91b7f0ab-600x600.png`,
  ],
  // 6 - Kit Hyalu B5 Face e olhos (only 1 image on original)
  "6": [],
  // 7 - Kit 3 Cicaplast
  "7": [
    `${BASE}imagemcicqaplastbaumeb5eficacia-600x600.webp`,
    `${BASE}imagemcicqaplastbaumeb5descritivo-600x600.webp`,
    `${BASE}imagemcicqaplastbaumeb5packshotselo-600x600.webp`,
  ],
  // 8 - Kit 3 Sérum Anti-Idade
  "8": [
    `${BASE}1_7f20432b-6d82-4b28-a89d-30d1017b4776.jpg`,
    `${BASE}2_06d915b7-897f-4056-8370-bb073a300881.jpg`,
    `${BASE}4_17c63e39-4b22-45ac-8be9-ad73b6be2b3e.jpg`,
    `${BASE}6_4b15ed12-a57a-441d-9fa0-affe19059dcf.jpg`,
    `${BASE}8_e836d904-c002-45f7-8066-502bd023b3d7.jpg`,
  ],
  // 9 - Pure Vitamin C Olhos
  "9": [
    `${BASE}imagem-pure-vitamin-c-creme-review-600x600.webp`,
    `${BASE}imagem-pure-vitamin-c-creme-ativos-600x600.webp`,
    `${BASE}imagem-pure-vitamin-c-creme-descritivo-600x600.webp`,
  ],
  // 10 - Effaclar Alta Tolerância
  "10": [
    `${BASE}53da029c-d074-4469-80f5-9e5108f067a7-la-rocheposay-effaclar-alta-tolerancia-sabonete-facial-300g-600x600.webp`,
    `${BASE}6efa99f1-8058-4157-9497-266305ede708-la-rocheposay-effaclar-alta-tolerancia-sabonete-facial-300g-600x600.webp`,
    `${BASE}f1968156-bc0c-49a3-86a0-23e2964461c3-la-rocheposay-effaclar-alta-tolerancia-sabonete-facial-300g-600x600.webp`,
  ],
  // 11 - Pure Vitamin C10
  "11": [
    `${BASE}imagem-vitamina-c10-mudanca-600x600.webp`,
    `${BASE}imagem-vitamina-c10-eficacia-600x600.webp`,
    `${BASE}imagem-vitamina-c10-ativos-600x600.webp`,
  ],
  // 12 - Mela B3
  "12": [
    `${BASE}857548-Serum-Concentrado-Intensivo-La-Roche-Posay-Melab3-30ml_0001_3337875890021_99_4_1200_72_SRGB-600x600.png`,
    `${BASE}857548-Serum-Concentrado-Intensivo-La-Roche-Posay-Melab3-30ml_0002_3337875890021_99_3_1200_72_SRGB-600x600.png`,
    `${BASE}857548-Serum-Concentrado-Intensivo-La-Roche-Posay-Melab3-30ml_0003_3337875890021_99_2_1200_72_SRGB-600x600.png`,
    `${BASE}857548-Serum-Concentrado-Intensivo-La-Roche-Posay-Melab3-30ml_0004_3337875890021_99_1_1200_72_SRGB-600x600.png`,
  ],
  // 13 - Kit Rotina Pele Renovada
  "13": [
    `${BASE}imagem-effaclar-concentrado-60g-eficacia-600x600.webp`,
    `${BASE}be57e2a5-396b-4b0f-8f45-bab99d51d9d5-la-rocheposay-salicyli-c10-antiidade-30ml-600x600.png`,
    `${BASE}protetor-solar-facial-la-roche-posay-anthelios-hydraox-fps-60-2-600x600.jpg`,
  ],
  // 14 - Kit Effaclar Concentrado Duplo
  "14": [
    `${BASE}imagem-effaclar-concentrado-60g-eficacia-600x600.webp`,
  ],
  // 15 - COMPRE 1 LEVE 3 Anthelios
  "15": [
    `${BASE}protetor-solar-facial-la-roche-posay-anthelios-hydraox-fps-60-4_c23a8eb8-3ddb-4d96-8f48-96bc4e9a8328-600x600.jpg`,
    `${BASE}protetor-solar-facial-la-roche-posay-anthelios-hydraox-fps-60-6_b13f8ffa-9ef6-48d0-ac8d-4a3e67af3202-600x600.jpg`,
    `${BASE}protetor-solar-facial-la-roche-posay-anthelios-hydraox-fps-60-2_bc71afb3-b525-46c2-a9fe-958f94b69458-600x600.jpg`,
  ],
  // 16 - Anthelios Hydraox FPS60
  "16": [
    `${BASE}protetor-solar-facial-la-roche-posay-anthelios-hydraox-fps-60-2-600x600.jpg`,
    `${BASE}protetor-solar-facial-la-roche-posay-anthelios-hydraox-fps-60-4-600x600.jpg`,
    `${BASE}protetor-solar-facial-la-roche-posay-anthelios-hydraox-fps-60-5-600x600.jpg`,
    `${BASE}protetor-solar-facial-la-roche-posay-anthelios-hydraox-fps-60-3-600x600.jpg`,
  ],
  // 17 - Ultra Cover FPS60
  "17": [
    `${BASE}eficacia-600x600.webp`,
    `${BASE}imagem-anthelios-ultra-cover-ativos-600x600.webp`,
    `${BASE}textura-600x600.webp`,
  ],
  // 18 - Cicaplast Baume B5
  "18": [
    `${BASE}imagemcicqaplastbaumeb5eficacia-600x600.webp`,
    `${BASE}imagemcicqaplastbaumeb5descritivo-600x600.webp`,
  ],
  // 19 - Lipikar Baume AP+M
  "19": [
    `${BASE}470a72f0-ade2-4d8f-b5c6-4ca6808dfff9-la-rocheposay-lipikar-baume-ap-m-hidratante-corporal-400ml_23837b13-16a3-4335-be4f-03dc91b7f0ab-600x600.png`,
  ],
  // 20 - Effaclar Concentrado Gel
  "20": [
    `${BASE}imagem-effaclar-concentrado-60g-eficacia-600x600.webp`,
  ],
  // 21 - Hyalu B5 Repair Creme 40g
  "21": [
    `${BASE}1-1-600x600.jpg`,
  ],
  // 22 - Kit Redutor de Linhas
  "22": [
    `${BASE}1-1-600x600.jpg`,
  ],
  // 23 - Retinol B3
  "23": [],
};
