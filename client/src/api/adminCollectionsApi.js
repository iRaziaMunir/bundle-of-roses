import { apiRequest, getAdminHeaders } from "./apiClient";

const ADMIN_COLLECTIONS_BASE_URL = "/api/admin/collections";

export function fetchAdminCollections() {
  return apiRequest(ADMIN_COLLECTIONS_BASE_URL, {
    method: "GET",
    headers: getAdminHeaders(),
  });
}

export function createAdminCollection(payload) {
  return apiRequest(ADMIN_COLLECTIONS_BASE_URL, {
    method: "POST",
    headers: getAdminHeaders(),
    body: JSON.stringify(payload),
  });
}

export function updateAdminCollection(id, payload) {
  return apiRequest(`${ADMIN_COLLECTIONS_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: getAdminHeaders(),
    body: JSON.stringify(payload),
  });
}

