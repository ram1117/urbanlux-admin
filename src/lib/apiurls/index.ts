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

export const getAllMerchandise = () => `${ADMIN_BASE_URL}/items`;
export const getMerchandise = (id: string) => `${ADMIN_BASE_URL}/items/${id}`;
export const deleteImage = (id: string) =>
  `${ADMIN_BASE_URL}/items/image/delete/${id}`;
export const addImage = (id: string) =>
  `${ADMIN_BASE_URL}/items/image/add/${id}`;
export const updateInventory = (id: string) =>
  `${ADMIN_BASE_URL}/items/inventory/${id}`;
export const createMerchandise = () => `${ADMIN_BASE_URL}/items/create`;
