const ADMIN_BASE_URL = process.env.API_ADMIN;

export const getCategories = () => `${ADMIN_BASE_URL}/category`;
export const getCategory = (id: string) => `${ADMIN_BASE_URL}/category/${id}`;
export const updateCategory = (id: string) =>
  `${ADMIN_BASE_URL}/category/${id}`;
