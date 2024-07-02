const ADMIN_BASE_URL = process.env.API_ADMIN;
const CLIENT_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_ADMIN;
const AUTH_BASE_URL = process.env.API_AUTH;

export const postCreateUser = () => `${AUTH_BASE_URL}/auth/signup`;

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
export const updateMerchandise = (id: string) =>
  `${ADMIN_BASE_URL}/items/${id}`;
export const addNewSize = (id: string) => `${ADMIN_BASE_URL}/items/size/${id}`;

export const getClientBrands = () => `${CLIENT_ADMIN_BASE_URL}/brands`;
export const getClientCategories = () => `${CLIENT_ADMIN_BASE_URL}/category`;

export const getOrdersClient = (status: string) =>
  `${CLIENT_ADMIN_BASE_URL}/orders?order_status=${status}`;
export const getAllOrdersClient = () =>
  `${CLIENT_ADMIN_BASE_URL}/orders/allorders`;

export const getOrderDetail = (id: string) => `${ADMIN_BASE_URL}/orders/${id}`;
export const confirmOrder = (id: string) =>
  `${ADMIN_BASE_URL}/orders/confirm/${id}`;
export const dispatchOrder = (id: string) =>
  `${ADMIN_BASE_URL}/orders/dispatch/${id}`;
