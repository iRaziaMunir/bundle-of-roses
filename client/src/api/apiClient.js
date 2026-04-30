const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

function buildHeaders(customHeaders = {}) {
  return {
    ...DEFAULT_HEADERS,
    ...customHeaders,
  };
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    let message = "Request failed";
    if (typeof payload === "object" && payload !== null) {
      message = payload.message || payload.error || message;
    } else if (typeof payload === "string" && payload.trim()) {
      message = payload.length > 280 ? "Request failed" : payload.trim();
    }
    throw new Error(String(message));
  }

  return payload;
}

export async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(options.headers),
  });

  return parseResponse(response);
}

export function getAdminHeaders() {
  return {
    "x-admin": "true",
  };
}

export async function uploadAdminImage(file) {
  const body = new FormData();
  body.append("image", file);

  const response = await fetch("/api/admin/uploads", {
    method: "POST",
    headers: getAdminHeaders(),
    body,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && "message" in payload ? payload.message : "Upload failed";
    throw new Error(message);
  }

  return payload;
}

