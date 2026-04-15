export interface ProductDescription {
  title?: string;
  intro: string;
  details?: string;
  howToUse?: string;
  benefits?: string[];
  ingredients?: string;
  expertTip?: string;
}

export const productDescriptions: Record<string, ProductDescription> = {};
