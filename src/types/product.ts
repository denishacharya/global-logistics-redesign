export interface Product {
  id: string;
  name: string;
  category: string;
  hsCode: string;
  image: string;
  description: string;
  specifications: {
    label: string;
    value: string;
  }[];
  exportDetails: {
    origin: string;
    minOrderQuantity: string;
    packaging: string;
    shelfLife?: string;
    certifications: string[];
  };
  price: {
    amount: string;
    currency: string;
    unit: string;
  };
  availableForExport: string[];
}

export type ProductCategory = 
  | "all"
  | "agricultural"
  | "textile"
  | "chemicals"
  | "machinery"
  | "electronics"
  | "consumer-goods";
