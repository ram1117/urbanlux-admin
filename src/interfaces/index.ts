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

export interface SigninFormState {
  success?: boolean;
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

export interface ISignupFormState {
  success?: boolean;
  errors: {
    _form?: string[];
    firstname?: string[];
    lastname?: string[];
    email?: string[];
    password?: string[];
    password1?: string[];
    mobile?: string[];
  };
}

export interface IAddressItem {
  _id: string;
  fullname: string;
  label: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  user: string;
}

export interface IOrderItem {
  _id: string;
  merchandise: string;
  merchandise_name: string;
  merchandise_thumbnail: string;
  quantity: number;
  size: string;
  subtotal: number;
  user: string;
  inventory: string;
  createdAt: string;
  updatedAt: string;
  cancelled: boolean;
}

export interface IOrder {
  _id: string;
  items: IOrderItem[];
  total: number;
  address: IAddressItem;
  payment_status: string;
  order_status: string;

  createdAt: string;
  updatedAt: string;
  cancelled: boolean;
  user: { _id: string; firstname: string; email: string };
}

export interface INewOrders {
  placed: IOrder[];
  confirmed: IOrder[];
}

export interface IOrderFilterFormState {
  data: IOrder[];
  success: boolean;
  errors: {
    _form?: string[];
    order_id?: string[];
    user_name?: string[];
    user_email?: string[];
    order_date?: string[];
  };
}

export enum ORDER_STATUS {
  PLACED = "placed",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  FULFILLED = "fulfilled",
  NOTFULFILLED = "not fulfilled",
}
