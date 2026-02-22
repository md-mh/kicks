// Category type from Platzi Fake Store API.
export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

// Product type from Platzi Fake Store API.
export interface ProductType {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export type SortType = "default" | "price-low-to-high" | "price-high-to-low";
