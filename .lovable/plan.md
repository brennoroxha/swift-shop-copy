I will add all products from the provided sources (data.csv and input_products.tsv) to the store, ensuring each has complete information (EAN, brand, full descriptions, and image galleries).

1. **Update Showers (IDs 24-32)**: Use data from `input_products.tsv` to add missing image galleries and EANs.
2. **Add New Products (IDs 84-96)**: Import 13 new products from `data.csv`, including:
    - Wheelbarrows (Carrinhos de Mão)
    - Garden Tools (Sopradores, Aparadores, Cortadores)
    - Water Pumps (Bombas de Água)
    - Pressure Washers (Lavadoras)
    - Tool Sets (Ferramentas)
3. **Update Categories**: 
    - Add a new "Ferramentas" category.
    - Map products to existing categories: "area-externa", "caixa-dagua", "banheiro", and the new "ferramentas".
4. **Data Synchronization**:
    - Update `src/data/products.ts` with the new list and categories.
    - Update `src/data/productImages.ts` with full image galleries (deduplicated).
    - Update `src/data/productDescriptions.ts` with detailed intros, specs (as details), and benefits.
5. **Asset Management**: Download and optimize images for all new products to `public/produtos/`.
6. **Feed Regeneration**: Update the Google Shopping feed to include all 96 products.

Technical details:
- Use a Python script to parse CSV/TSV and download images with high-res upgrades.
- Ensure unique image hashes to avoid duplicates.
- Automate the update of TypeScript files.