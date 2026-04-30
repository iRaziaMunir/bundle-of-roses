import { apiRequest, getAdminHeaders } from "./apiClient";

const ADMIN_ORDERS_BASE_URL = "/api/admin/orders";

export function fetchAdminOrders() {
  return apiRequest(ADMIN_ORDERS_BASE_URL, {
    method: "GET",
    headers: getAdminHeaders(),
  });
}

