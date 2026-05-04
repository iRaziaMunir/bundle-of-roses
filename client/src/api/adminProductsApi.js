import { apiRequest, getAdminHeaders } from "./apiClient";

const ADMIN_PRODUCTS_BASE_URL = "/api/admin/products";

export function fetchAdminProducts(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.status) {
    searchParams.set("status", params.status);
  }

  const queryString = searchParams.toString();
  const url = queryString ? `${ADMIN_PRODUCTS_BASE_URL}?${queryString}` : ADMIN_PRODUCTS_BASE_URL;

  return apiRequest(url, {
    method: "GET",
    headers: getAdminHeaders(),
  });
}

export function createAdminProduct(payload) {
  return apiRequest(ADMIN_PRODUCTS_BASE_URL, {
    method: "POST",
    headers: getAdminHeaders(),
    body: JSON.stringify(payload),
  });
}

export function updateAdminProduct(id, payload) {
  return apiRequest(`${ADMIN_PRODUCTS_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: getAdminHeaders(),
    body: JSON.stringify(payload),
  });
}

export function archiveAdminProduct(id) {
  return apiRequest(`${ADMIN_PRODUCTS_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAdminHeaders(),
  });
}

export function permanentlyDeleteAdminProduct(id) {
  return apiRequest(`${ADMIN_PRODUCTS_BASE_URL}/${id}/permanent`, {
    method: "DELETE",
    headers: getAdminHeaders(),
  });
}

export function adjustAdminProductInventory(productId, payload) {
  return apiRequest(`${ADMIN_PRODUCTS_BASE_URL}/${productId}/inventory-adjust`, {
    method: "POST",
    headers: getAdminHeaders(),
    body: JSON.stringify(payload),
  });
}
