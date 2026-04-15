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
  "1": {
    title: "Escada Alumínio 5 Degraus Reisam",
    intro: "Facilidade e versatilidade no uso doméstico. Escada leve, resistente e fácil de manusear. Fabricada em alumínio de alta qualidade. Certificada pelo INMETRO. Suporta até 120 kg com segurança.",
    details: "Um aliado para o seu dia para maior segurança e facilidade. Ideal para alcançar locais altos como prateleiras e armários, realizar pequenos reparos como trocar lâmpadas e arrumar chuveiros, além de ser perfeita para faxinas em áreas de difícil alcance. Design leve e compacto: Com apenas 3,3 kg, seu peso reduzido facilita o manuseio e transporte, enquanto o tamanho compacto permite que seja armazenada facilmente em espaços pequenos. Conforto e segurança garantidos: Os pés antiderrapantes reduzem o risco de acidentes, os degraus mais largos proporcionam maior conforto durante o uso, e o sistema de articulação com travamento de segurança oferece estabilidade total. Durabilidade e resistência: Fabricada em alumínio de alta qualidade, suporta até 120 kg e é um item resistente, ideal para uso frequente e de longa duração.",
    benefits: [
      "5 degraus antiderrapantes",
      "Suporta até 120 Kg",
      "Apenas 3,30 Kg — leve e fácil de transportar",
      "Sapatas antiderrapantes para maior segurança",
      "Altura aberta: 1,53 m",
      "Certificada pelo INMETRO",
      "Garantia de 12 meses",
    ],
  },
};
