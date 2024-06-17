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
