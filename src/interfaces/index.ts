export interface ICategory {
  _id: string;
  name: string;
  description: string;
  category_code: string;
  thumbnail: string;
}

export interface IEditCategoryFormState {
  errors: {
    thumbnail?: string[];
    name?: string[];
    description?: string[];
    category_code?: string[];
    _form?: string[];
  };
}

export interface INewBrandFormState {
  errors: {
    logo?: string[];
    name?: string[];
    description?: string[];
    brand_code?: string[];
    _form?: string[];
    create_store?: string[];
  };
}

export interface IBrand {
  _id: string;
  name: string;
  description: string;
  brand_code: string;
  logo: string;
  create_store: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInventory {
  _id: string;
  size: string;
  stock: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMerchandise {
  _id: string;
  name: string;
  description: string;
  features: string[];
  thumbnail: string;
  images: string[];
  category: string;
  brand: IBrand;
  inventory: IInventory[];
  createdAt: string;
  updatedAt: string;
}