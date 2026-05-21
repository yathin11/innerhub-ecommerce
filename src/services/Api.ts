export const BASE_URL = "https://innerhub-backend.onrender.com/api";

const request = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
};

export type SizeType = {
  size: string;
  price: number | string;
  offerPercent?: number | string;
  offerPrice: number | string;
  stock: number | string;
};

export type VariantType = {
  color: string;
  images: string[];
  sizes: SizeType[];
};

export type ProductType = {
  _id?: string;
  name: string;
  description?: string;
  basePrice?: number;
  variants?: VariantType[];
};

export type OrderType = {
  _id: string;
  id?: number;
  status: string;
  tracking_id?: string;
  total?: number;
};

export type UserType = {
  phone: string;
};

export type CartItemType = {
  phone?: string;
  productId: string;
  quantity: number;
};

export const saveUserPhone = async (phone: string): Promise<UserType> => {
  return request<UserType>("/user", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
};

export const getProducts = async (): Promise<ProductType[]> => {
  return request<ProductType[]>("/products");
};

export const getProduct = async (id: string): Promise<ProductType> => {
  return request<ProductType>(`/products/${id}`);
};

export const addProduct = async (
  product: ProductType
): Promise<ProductType> => {
  return request<ProductType>("/admin/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (
  id: string,
  product: ProductType
): Promise<ProductType> => {
  return request<ProductType>(`/admin/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (
  id: string
): Promise<{ message: string }> => {
  return request<{ message: string }>(`/admin/products/${id}`, {
    method: "DELETE",
  });
};

export const getCart = async (phone: string): Promise<CartItemType[]> => {
  return request<CartItemType[]>(`/cart/${phone}`);
};

export const addToCartApi = async (
  phone: string,
  productId: string
): Promise<CartItemType> => {
  return request<CartItemType>("/cart/add", {
    method: "POST",
    body: JSON.stringify({
      phone,
      productId,
      quantity: 1,
    }),
  });
};

export const removeFromCartApi = async (
  phone: string,
  productId: string
): Promise<{ message: string }> => {
  return request<{ message: string }>("/cart/remove", {
    method: "DELETE",
    body: JSON.stringify({
      phone,
      productId,
    }),
  });
};

export const placeOrder = async (phone: string): Promise<OrderType> => {
  return request<OrderType>("/order", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
};

export const getOrders = async (phone: string): Promise<OrderType[]> => {
  return request<OrderType[]>(`/orders/${phone}`);
};

export const getAllOrders = async (): Promise<OrderType[]> => {
  return request<OrderType[]>("/admin/orders");
};

export const updateOrderStatus = async (
  id: string,
  status: string
): Promise<OrderType> => {
  return request<OrderType>(`/admin/orders/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
};

export const getUsers = async (): Promise<UserType[]> => {
  return request<UserType[]>("/admin/users");
};