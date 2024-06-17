const ADMIN_BASE_URL = process.env.API_ADMIN;

export const getCategories = () => `${ADMIN_BASE_URL}/category`;
export const getCategory = (id: string) => `${ADMIN_BASE_URL}/category/${id}`;
export const createCategory = () => `${ADMIN_BASE_URL}/category`;
export const updateCategory = (id: string) =>
  `${ADMIN_BASE_URL}/category/${id}`;

export const getBrands = () => `${ADMIN_BASE_URL}/brands`;
export const getBrand = (id: string) => `${ADMIN_BASE_URL}/brands/${id}`;
export const createBrand = () => `${ADMIN_BASE_URL}/brands`;
export const updateBrand = (id: string) => `${ADMIN_BASE_URL}/brands/${id}`;
