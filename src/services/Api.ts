const BASE_URL = "https://innerhub-backend.onrender.com/api";

// ======================
// USER (PHONE)
// ======================
export const saveUserPhone = async (phone) => {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });

  return res.json();
};

// ======================
// PRODUCTS
// ======================
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

export const addProduct = async (product) => {
  const res = await fetch(`${BASE_URL}/admin/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

// ======================
// CART
// ======================
export const getCart = async (phone) => {
  const res = await fetch(`${BASE_URL}/cart/${phone}`);
  return res.json();
};

export const addToCartApi = async (phone, productId) => {
  const res = await fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
      productId,
      quantity: 1,
    }),
  });

  return res.json();
};

export const removeFromCartApi = async (phone, productId) => {
  const res = await fetch(`${BASE_URL}/cart/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, productId }),
  });

  return res.json();
};

// ======================
// ORDERS
// ======================
export const placeOrder = async (phone) => {
  const res = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });

  return res.json();
};

export const getOrders = async (phone) => {
  const res = await fetch(`${BASE_URL}/orders/${phone}`);
  return res.json();
};


export const getAllOrders = async () => {
  const res = await fetch(`${BASE_URL}/admin/orders`);
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/admin/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
};

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/admin/users`);
  return res.json();
};