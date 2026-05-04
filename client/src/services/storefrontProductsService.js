async function parseJsonSafe(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

/**
 * Public storefront: GET /api/products/:slug (active products only).
 */
export async function fetchStorefrontProductBySlug(productSlug, { abortSignal } = {}) {
  const slug = String(productSlug || "").trim();
  if (!slug) throw new Error("Product not found");

  const encodedSlug = encodeURIComponent(slug);
  const response = await fetch(`/api/products/${encodedSlug}`, {
    method: "GET",
    signal: abortSignal,
  });

  const body = await parseJsonSafe(response);

  if (!response.ok) {
    throw new Error(body?.message || "Product not found");
  }

  return body;
}
