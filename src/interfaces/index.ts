export interface ICategory {
  _id: string;
  name: string;
  description: string;
  category_code: string;
  thumbnail: string;
}

export interface IEditCategoryFormState {
  success: boolean;
  errors: {
    thumbnail?: string[];
    name?: string[];
    description?: string[];
    category_code?: string[];
    _form?: string[];
  };
}

export interface INewBrandFormState {
  success: boolean;
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
  category: ICategory;
  brand: IBrand;
  color: string;
  inventory: IInventory[];
  createdAt: string;
  updatedAt: string;
}

export interface IGenericFormState {
  success?: boolean;
  errors: { _form?: string[] };
}

export interface IAddImageFormState {
  success?: boolean;
  errors: { _form?: string[]; image?: string[]; thumbnail?: string[] };
}

export interface IUpdateInventoryFormState {
  success: boolean;
  errors: { _form?: string[]; stock?: string[]; price?: string[] };
}

export interface IAddMerchFormState {
  errors: {
    _form?: string[];
    name?: string[];
    description?: string[];
    brand?: string[];
    category?: string[];
    images?: string[];
    thumbnail?: string[];
    features?: string[];
    sizes?: string[];
    color?: string[];
  };
}

export interface IEditMerchFormState {
  success: boolean;
  errors: {
    _form?: string[];
    name?: string[];
    description?: string[];
    brand?: string[];
    category?: string[];
    features?: string[];
    color?: string[];
  };
}

export interface IAddSizeFormState {
  success: boolean;
  errors: {
    _form?: string[];
    size?: string[];
  };
}
