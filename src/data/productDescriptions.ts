// Product descriptions extracted from the original store
// Each key matches the product id in allProducts

export interface ProductDescription {
  title?: string;
  intro: string;
  details?: string;
  howToUse?: string;
  benefits?: string[];
  ingredients?: string;
  expertTip?: string;
}

export const productDescriptions: Record<string, ProductDescription> = {
  // 1 - Effaclar Ultra Concentrado – Sérum Antiacne 30ml
  "1": {
    title: "Sérum Effaclar Ultra Concentrado",
    intro: "Sérum antiacne ultra concentrado com ação anti-imperfeições. Reduz espinhas, cravos e marcas de acne com eficácia comprovada desde a primeira semana de uso.",
    details: "Formulado com alta concentração de Ácido Salicílico, Niacinamida e LHA para combater a acne em todas as suas fases. Textura sérum leve e de rápida absorção, ideal para peles oleosas e acneicas.",
    howToUse: "Aplique de 3 a 4 gotas sobre a pele limpa e seca, de manhã e/ou à noite. Evite a área dos olhos. Após o uso, aplique protetor solar FPS≥30.",
    benefits: [
      "Reduz espinhas e cravos",
      "Diminui marcas de acne",
      "Controla a oleosidade",
      "Textura leve e não oleosa",
    ],
  },
  // 2 - Pure Niacinamide 10 – Sérum Facial 30ml
  "2": {
    title: "Pure Niacinamide 10",
    intro: "Sérum concentrado antimanchas enriquecido com 10% de Niacinamida. Criado para corrigir e prevenir manchas como nunca antes.",
    details: "Com eficácia clínica comprovada, ele intercepta o excesso de melanina antes que cause diferenças de tonalidade na pele. Reduz visivelmente manchas da pele, incluindo manchas solares, manchas pós acne e até mesmo manchas persistentes. Resultados visíveis em 1 semana.",
    howToUse: "Aplicar após a limpeza do rosto. Com a pele limpa e seca, aplique de 3 a 4 gotas do Sérum. Espalhe por todo o rosto, pescoço e colo, massageando. A aplicação pode ser feita de manhã e/ou à noite. Não aplique na área dos olhos.",
    benefits: [
      "Eficácia anti-hiperpigmentação",
      "Corrige manchas persistentes e pós acne",
      "Uniformiza a pele",
      "Reduz e previne o reaparecimento de manchas",
      "Ação antioxidante",
      "Auxilia na renovação da pele",
    ],
  },
  // 3 - Salicyli C10 – Redutor de Linhas 30ml
  "3": {
    title: "La Roche-Posay Salicyli C10",
    intro: "Sérum Redutor de Linhas para todos os tipos de pele. Salicyli C10 corrige imperfeições e ajuda na renovação da pele.",
    details: "Formulação que combina Vitamina C pura e Ácido Salicílico, para devolver a luminosidade, melhorar a textura do rosto e controlar a oleosidade. Sua pele fica com viço, rugas e linhas finas minimizadas.",
    ingredients: "Vitamina C: possui ação anti-idade e antioxidante. Ácido Hialurônico: estimula a síntese de colágeno e a retenção de água ideal para uma hidratação profunda. Ácido Salicílico: ação renovadora e esfoliante.",
  },
  // 4 - Hyalu B5 Repair – Sérum Redutor de Linhas 30ml
  "4": {
    title: "Sérum Anti-Idade La Roche-Posay Hyalu B5 Repair",
    intro: "Reparador antirrugas que ativa mecanismos de prevenção e reparação dos sinais da idade.",
    details: "Além de reduzir as rugas, recupera a elasticidade e volume, melhora o viço e a luminosidade com uma textura sérum aqua gel refrescante, adaptada para peles sensíveis. Estimulando a síntese de colágeno, possui Vitamina B5 que repara a barreira cutânea e age como um potencializador de eficácia.",
    howToUse: "Aplique de 2 a 3 gotas do produto sobre o rosto e pescoço previamente limpos. Espalhe massageando suavemente de dentro para fora até absorver completamente. Use de manhã ou à noite.",
    benefits: [
      "Reduz rugas e linhas finas",
      "Estimula a capacidade de renovação da pele",
      "Melhora o viço e a firmeza da pele",
      "Testado dermatologicamente",
      "Para todos os tipos de pele, inclusive as peles sensíveis",
    ],
    ingredients: "Duplo Ácido Hialurônico: pele mais firme a partir da síntese de colágeno e hidratação profunda. Alta concentração de Vitamina B5: efeito renovador e reparador. Água Termal de La Roche-Posay: propriedades calmantes e antioxidantes.",
  },
  // 5 - Kit com 2 Lipikar Baume AP + M – Hidratante Corporal 400ml
  "5": {
    title: "Lipikar Baume AP+M",
    intro: "O novo Lipikar Baume AP+M reequilibra o microbioma da pele. Acalma a pele imediatamente e reduz a coceira. Com sua eficácia anti-recidiva, ela aumenta o espaçamento das crises.",
    details: "Nutre e restaura a barreira da pele. Formulado para bebês, crianças, adultos com pele muito seca e extremamente ressecada. Absorve rapidamente para facilitar e acelerar a aplicação diária. Acabamento não oleoso e não pegajoso.",
    howToUse: "Aplique no rosto e no corpo, uma vez ao dia. Para obter melhores resultados, use o Lipikar Surgras durante o banho para aliviar as crises.",
    benefits: [
      "Acalma imediatamente a pele propensa ao ressecamento severo",
      "Eficácia anti-coceira e anti-recidiva reforçada",
      "Reequilibra o microbioma da pele",
    ],
    ingredients: "Formulado com Aqua Posae para reequilibrar o microbioma, manteiga de karité atuando na restauração da pele e niacinamida com ação calmante. Testado em mais de 700 indivíduos. Sem perfume.",
  },
  // 6 - Kit Hyalu B5 Face e olhos + Anthelios UVmune (3 PRODUTOS)
  "6": {
    title: "Kit Hyalu B5 + Anthelios UVMune",
    intro: "Transforme sua rotina de cuidados com a pele com a poderosa combinação dos produtos Hyalu B5 Sérum, Hyalu B5 Olhos e Anthelios UVMune Airlicium da La Roche-Posay!",
    details: "O Hyalu B5 Sérum proporciona hidratação intensa, preenchimento de rugas e recuperação da elasticidade da pele. O Hyalu B5 Olhos reduz olheiras, bolsas e linhas finas ao redor dos olhos. E o Anthelios UVMune Airlicium protege sua pele dos raios UV mais danosos e reduz a oleosidade, deixando-a com um acabamento fosco e sem brilho.",
    expertTip: "Experimente essa rotina completa e conquiste uma pele saudável e radiante!",
  },
  // 7 - Kit com 3 Cicaplast Baume B5+ – Creme Hidratante 40ml
  "7": {
    title: "Cicaplast Baume B5 de La Roche-Posay",
    intro: "Creme multirreparador calmante com alto poder de hidratação e reparação da pele. Repara e acalma a pele, trazendo conforto e suavidade.",
    details: "Textura creme não oleosa, que forma uma película protetora sem resíduos esbranquiçados. Indicado para corpo, rosto e lábios. Acalma a pele sensível após dermatites graças à sua fórmula que associa Panthenol 5%, Madecassoside. Para toda a família: bebês, crianças e adultos. Sem parabenos. Sem perfume. Sem lanolina.",
    howToUse: "Aplicar duas vezes ao dia em pele pré-lavada e seca. Pode ser aplicado numa camada generosa. Pode ser aplicado no corpo, rosto e lábios. Evitar o contorno dos olhos.",
    benefits: [
      "Hidrata intensivamente zonas ressecadas",
      "Alivia a sensação das queimaduras solares e leves",
      "Protege a pele com uma textura não oleosa",
    ],
    ingredients: "Contém madecassoside, zinco, manganês e cobre, que estimulam a reparação da pele. Manteiga de Karité e Glicerina garantem ação hidratante e relipidizante.",
  },
  // 8 - Kit 3 Sérum Anti-Idade (3 PRODUTOS) + Brinde Exclusivo
  "8": {
    title: "Kit 3 Sérum Anti-Idade",
    intro: "Kit completo com 3 séruns anti-idade da La Roche-Posay + Brinde Exclusivo. A combinação perfeita para combater os sinais do envelhecimento.",
    details: "Inclui os melhores séruns da linha anti-idade La Roche-Posay para uma rotina completa de cuidados com a pele madura. Reduz rugas, linhas finas e melhora a firmeza e luminosidade da pele.",
    benefits: [
      "Ação anti-idade completa",
      "Redução de rugas e linhas finas",
      "Melhora a firmeza e elasticidade",
      "Brinde exclusivo incluso",
    ],
  },
  // 9 - Pure Vitamin C Olhos – Creme Anti-Idade 15ml
  "9": {
    title: "Pure Vitamin C Olhos",
    intro: "Creme anti-idade para a região dos olhos com Vitamina C pura. Reduz olheiras, bolsas e linhas finas ao redor dos olhos.",
    details: "Fórmula concentrada com Vitamina C pura que ilumina a área dos olhos e combate os sinais de fadiga e envelhecimento. Textura leve e de rápida absorção, ideal para uso diário.",
    howToUse: "Aplique uma pequena quantidade ao redor dos olhos, de manhã e/ou à noite, com leves batidas até a completa absorção.",
    benefits: [
      "Reduz olheiras e bolsas",
      "Diminui linhas finas ao redor dos olhos",
      "Ilumina a área dos olhos",
      "Ação antioxidante",
    ],
  },
  // 10 - Effaclar Alta Tolerância – Sabonete Facial 300g
  "10": {
    title: "La Roche-Posay Effaclar Alta Tolerância",
    intro: "Gel de limpeza para peles mistas e oleosas. Controla a produção de sebo excessiva e limpa com suavidade.",
    details: "Previne a formação de cravos e espinhas, desobstrui os poros e deixa a pele macia e fresca após a limpeza. Tudo isso sem deixar aquela sensação de repuxamento ou ressecar o rosto.",
    howToUse: "De manhã e à noite, com o rosto molhado, aplique o gel de limpeza e massageie suavemente até limpar bem a pele. Enxágue.",
    expertTip: "A limpeza é o primeiro passo para manter a pele sempre saudável e bonita. Faça o procedimento ao acordar e antes de dormir.",
    ingredients: "PCA de Zinco: propriedades antibacteriana e controle de oleosidade. Glicerina: hidratação sem repuxamento. Caprylyl Glycol: ação hidratante e antibacteriana.",
  },
  // 11 - Pure Vitamin C10 – Sérum Facial 30ml
  "11": {
    title: "La Roche-Posay Pure Vitamin C10 Oil Control",
    intro: "Sérum facial redutor de linhas para peles mistas à oleosas. Ideal para garantir uma pele revigorada e mais jovem.",
    details: "Fórmula exclusiva com textura leve, não oleosa e que confere uma sensação de frescor à cútis. Auxilia na redução de rugas, garantindo um rosto com aspecto mais saudável e renovado.",
    howToUse: "Aplique no rosto após a limpeza pela manhã e/ou à noite. Evite o contorno dos olhos. Após o uso e antes da exposição ao sol, aplique protetor solar FPS≥30.",
    ingredients: "Ácido Ascórbico, Hialuronato de Sódio, Ácido Salicílico.",
  },
  // 12 - Mela B3 Sérum Anti Manchas – 30ml
  "12": {
    title: "Mela B3 Sérum Anti Manchas",
    intro: "Sérum concentrado antimanchas enriquecido com Melasyl™, o mais novo e exclusivo ativo da La Roche-Posay, e 10% de Niacinamida.",
    details: "Criado após 18 anos de pesquisa, MelasyL™ é um novo ativo patenteado para corrigir e prevenir manchas. Intercepta o excesso de melanina antes que cause diferenças de tonalidade na pele. Resultados visíveis em 1 semana, em todos os tons e tipos de pele, inclusive as oleosas.",
    howToUse: "Aplicar após a limpeza do rosto. Com a pele limpa e seca, aplique de 3 a 4 gotas. Espalhe por todo o rosto, pescoço e colo, massageando. Não aplique na área dos olhos.",
    benefits: [
      "Corrige manchas persistentes e pós acne",
      "Uniformiza a pele",
      "Reduz e previne o reaparecimento de manchas",
      "Ação antioxidante",
      "Auxilia na renovação da pele",
    ],
  },
  // 13 - Kit La Roche-Posay – Rotina para uma Pele Renovada e Protegida (3 PRODUTOS)
  "13": {
    title: "Kit Rotina Pele Renovada e Protegida",
    intro: "Kit completo com 3 produtos para uma rotina de cuidados que renova e protege a pele.",
    details: "Effaclar Reequilibrante: espuma cremosa de limpeza para peles mistas a oleosas. Limpa gentilmente e reduz a oleosidade desde o primeiro uso. Pure Vitamin C: sérum concentrado antirrugas antioxidante renovador com 10% de vitamina C pura. Anthelios UVMune 400: o filtro solar mais eficiente contra os raios UV mais profundos, com FPS 60 e ultra resistência.",
  },
  // 14 - Kit La Roche-Posay Effaclar Concentrado Duplo (2 Produtos)
  "14": {
    title: "Kit Effaclar Concentrado Duplo",
    intro: "Kit com sérum antiacne e gel de limpeza facial para peles mistas e oleosas. Auxilia na redução da acne e melhora o aspecto de manchas e da textura da pele.",
    details: "Com o Kit a pele fica completamente limpa e renovada, pois possui uma combinação única de ativos que permitem a redução de marcas causadas pela acne.",
    howToUse: "Aplique pela manhã e à noite sobre a pele úmida. Massageie suavemente e enxágue com água fria. Agite o sérum antes de usar e aplique 3 gotas sobre o rosto e pescoço previamente limpos.",
    expertTip: "O tratamento deve ser combinado com o uso diário de proteção solar, mínimo FPS 30.",
  },
  // 15 - COMPRE 1 LEVE 3 – Anthelios Hydraox FPS60 – Protetor Solar 50ml
  "15": {
    title: "Anthelios Hydraox FPS60",
    intro: "COMPRE 1 LEVE 3! Protetor solar facial com ação anti-idade. Proteção avançada contra os raios UV mais prejudiciais.",
    details: "Anthelios Hydraox FPS60 oferece ultra proteção solar com ação antioxidante. Previne o fotoenvelhecimento enquanto protege a pele dos danos solares. Textura leve e não oleosa com acabamento invisível.",
    benefits: [
      "Ultra Proteção FPS 60",
      "Ação anti-idade e antioxidante",
      "Ultra Resistência a água, suor e areia",
      "Textura fluida não oleosa",
    ],
  },
  // 16 - Anthelios Hydraox FPS60 – Protetor Solar 50ml
  "16": {
    title: "Anthelios Hydraox FPS60",
    intro: "Protetor solar facial com ação anti-idade e antioxidante. Proteção avançada contra os raios UV mais prejudiciais.",
    details: "Anthelios Hydraox FPS60 oferece ultra proteção solar com ação antioxidante. Previne o fotoenvelhecimento enquanto protege a pele dos danos solares. Textura leve e não oleosa com acabamento invisível.",
    benefits: [
      "Ultra Proteção FPS 60",
      "Ação anti-idade e antioxidante",
      "Ultra Resistência a água, suor e areia",
      "Textura fluida não oleosa",
    ],
  },
  // 17 - Protetor Solar Facial com Cor Anthelios Ultra Cover FPS60
  "17": {
    title: "Anthelios Ultra Cover FPS60",
    intro: "Protetor solar facial com cor e alta cobertura. Protege e uniformiza a pele com acabamento natural.",
    details: "Anthelios Ultra Cover FPS60 combina alta proteção solar com cobertura de cor para uniformizar a pele. Ideal para uso diário como protetor solar e base. Textura leve com acabamento natural.",
    benefits: [
      "Alta proteção FPS 60",
      "Cobertura de cor para uniformizar a pele",
      "Acabamento natural",
      "Resistente à água",
    ],
  },
  // 18 - Cicaplast Baume B5 – Creme Hidratante 40ml
  "18": {
    title: "Cicaplast Baume B5 de La Roche-Posay",
    intro: "Creme multirreparador calmante com alto poder de hidratação e reparação da pele. Repara e acalma a pele, trazendo conforto e suavidade.",
    details: "Textura creme não oleosa, que forma uma película protetora sem resíduos esbranquiçados. Indicado para corpo, rosto e lábios. Acalma a pele sensível após dermatites graças à fórmula que associa Panthenol 5% e Madecassoside. Para toda a família: bebês, crianças e adultos. Sem parabenos. Sem perfume. Sem lanolina.",
    howToUse: "Aplicar duas vezes ao dia em pele pré-lavada e seca. Pode ser aplicado no corpo, rosto e lábios. Evitar o contorno dos olhos.",
    benefits: [
      "Hidrata intensivamente zonas ressecadas",
      "Alivia a sensação das queimaduras solares e leves",
      "Protege a pele com uma textura não oleosa",
    ],
    ingredients: "Madecassoside, zinco, manganês e cobre. Manteiga de Karité e Glicerina garantem ação hidratante e relipidizante.",
  },
  // 19 - Lipikar Baume AP + M – Hidratante Corporal 400ml
  "19": {
    title: "Lipikar Baume AP+M",
    intro: "O novo Lipikar Baume AP+M reequilibra o microbioma da pele. Acalma a pele imediatamente e reduz a coceira.",
    details: "Nutre e restaura a barreira da pele. Formulado para bebês, crianças, adultos com pele muito seca e extremamente ressecada. Absorve rapidamente. Acabamento não oleoso e não pegajoso.",
    howToUse: "Aplique no rosto e no corpo, uma vez ao dia. Para obter melhores resultados, use o Lipikar Surgras durante o banho.",
    benefits: [
      "Acalma imediatamente a pele",
      "Eficácia anti-coceira e anti-recidiva",
      "Reequilibra o microbioma da pele",
    ],
    ingredients: "Aqua Posae, manteiga de karité e niacinamida. Testado em mais de 700 indivíduos. Sem perfume.",
  },
  // 20 - Effaclar Concentrado Gel de Limpeza Facial 300g
  "20": {
    title: "La Roche-Posay Effaclar Concentrado",
    intro: "Gel de limpeza para peles mistas e oleosas. Effaclar Concentrado desobstrui os poros profundamente e ajuda na redução da acne.",
    details: "Remove até as impurezas mais profundas sem ressecar o rosto. Fórmula com combinação única de Ácido Salicílico, Zinco e LHA, ingredientes que proporcionam eficácia antiacne comprovada.",
    howToUse: "Aplique de manhã e à noite sobre a pele úmida. Massageie suavemente e enxágue com água fria.",
    expertTip: "A limpeza é o primeiro passo para rotina de cuidados. Em seguida, prossiga com tônico e hidratação.",
    ingredients: "LHA + Ácido Salicílico: renovação celular e combate à acne. Sais de Zinco: desobstrui poros e regula oleosidade. Glicerina: mantém hidratação e protege a pele.",
  },
  // 21 - Hyalu B5 Repair – Redutor de Linhas 40g
  "21": {
    title: "La Roche-Posay Hyalu B5 Repair",
    intro: "Redutor de Linhas para peles maduras e sensíveis. Com tripla ação reparadora, firma e reduz a aparência de rugas e linhas finas.",
    details: "Melhora a elasticidade da pele, preenche as marcas do tempo e recupera a hidratação. Seu rosto ganha uma aparência mais jovem, viçosa e toque sedoso.",
    howToUse: "Com a pele higienizada e seca, aplique o creme sobre o rosto e pescoço. Massageie suavemente até completa absorção. Não aplique na área dos olhos. Use de manhã e à noite.",
    expertTip: "Ordem dos produtos da rotina de skincare: limpeza, tônico facial, anti-idade e protetor solar. O filtro solar sempre é o último passo.",
    ingredients: "Pro-Xylane®: recupera sustentação e contorno. Duplo Ácido Hialurônico: síntese de colágeno e hidratação profunda. Vitamina B5: efeito renovador e reparador. Água Termal: calmante e antioxidante.",
  },
  // 22 - Kit Redutor de Linhas – Sérum Hyalu B5 + Creme Repair (2 PRODUTOS)
  "22": {
    title: "Kit Hyalu Redutor de Linhas",
    intro: "Kit com sérum e creme Redutor de Linhas para todos os tipos de pele. Possui tripla ação reparadora, ideal para peles sensíveis e mais maduras.",
    details: "Traz mais firmeza para a pele, amenizando rugas, linhas finas, além de redefinir o contorno facial.",
    howToUse: "Após a higienização, espalhe o sérum sobre o rosto e pescoço até absorção. Em seguida, aplique o creme. Não aplique na área dos olhos. Use de manhã e à noite.",
    ingredients: "Pro-Xylane®: sustentação e contorno. Duplo Ácido Hialurônico: colágeno e hidratação. Vitamina B5: renovação e reparação. Água Termal: calmante e antioxidante.",
  },
  // 23 - Retinol B3 – Sérum Redutor de Linhas 30ml
  "23": {
    title: "Retinol B3 Sérum",
    intro: "Cuidado antirrugas uniformizador e restaurador, com alta eficácia nos resultados e máxima tolerância em peles sensíveis.",
    details: "Combina Retinol Puro, Vitamina B3 e Água Termal de La Roche-Posay para reduzir rugas acentuadas, uniformizar a textura da pele, combater o fotoenvelhecimento e devolver a firmeza. Textura sérum não oleosa e de rápida absorção.",
    howToUse: "Aplicar à noite, de 2 a 3 gotas no rosto e pescoço. Use em associação com protetor solar diário (FPS > 15).",
    benefits: [
      "Reduz rugas acentuadas",
      "Uniformiza a tonalidade e textura da pele",
      "Combate o fotoenvelhecimento",
      "Melhora a firmeza",
      "96% de pele confortável",
      "92% suave para a pele",
    ],
    ingredients: "Retinol Puro: correção de sinais de fotoenvelhecimento com liberação progressiva. Vitamina B3: melhora a barreira da pele, acalma e reduz pigmentação. Água Termal: ação calmante e suavizante.",
  },
};
