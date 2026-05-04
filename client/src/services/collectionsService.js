

function buildUrlWithQueryParams(basePath, queryParams = {}) {

  const urlSearchParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([paramName, paramValue]) => {
    const isMissingValue = paramValue === undefined || paramValue === null || paramValue === "";
    if (isMissingValue) return;
    urlSearchParams.set(paramName, String(paramValue));
  });
  const queryString = urlSearchParams.toString();
  const hasQueryString = queryString.length > 0;
  return hasQueryString ? `${basePath}?${queryString}` : basePath;
}


async function safeJson(fetchResponse) {
  try {
    return await fetchResponse.json();
  } catch {
    return {};
  }
}

export async function getCollectionProductsBySlug({ slug, limit = 4, signal } = {}) {
  const safeSlug = encodeURIComponent(String(slug || "").trim().toLowerCase());
  const url = buildUrlWithQueryParams(`/api/collections/${safeSlug}/products`, { limit });
  const res = await fetch(url, { method: "GET", signal });
  const data = await safeJson(res);
  if (!res.ok) throw new Error(data?.message || "Failed to load collection products");
  return {
    title: data?.title || "",
    slug: data?.slug || safeSlug,
    products: Array.isArray(data?.products) ? data.products : [],
  };
}

/**
 * Full collection page: GET /api/collections/:slug → { collection, products }
 */
/**
 * Storefront index: GET /api/collections/browse?slug=optional
 */
export async function fetchCollectionsBrowse({ collectionSlug, abortSignal } = {}) {
  const queryParams = {};
  if (collectionSlug) queryParams.slug = String(collectionSlug).trim().toLowerCase();
  const url = buildUrlWithQueryParams("/api/collections/browse", queryParams);
  const response = await fetch(url, { method: "GET", signal: abortSignal });
  const body = await safeJson(response);
  if (!response.ok) throw new Error(body?.message || "Unable to load collections");
  return {
    collections: Array.isArray(body.collections) ? body.collections : [],
    products: Array.isArray(body.products) ? body.products : [],
    activeCollectionSlug: body.activeCollectionSlug ?? null,
  };
}

export async function fetchCollectionWithProductsBySlug(collectionSlug, { abortSignal } = {}) {
  const normalizedSlug = String(collectionSlug || "").trim().toLowerCase();
  if (!normalizedSlug) throw new Error("Collection not found");

  const encodedSlug = encodeURIComponent(normalizedSlug);
  const response = await fetch(`/api/collections/${encodedSlug}`, {
    method: "GET",
    signal: abortSignal,
  });
  const body = await safeJson(response);
  if (!response.ok) throw new Error(body?.message || "Collection not found");

  return {
    collection: body.collection ?? null,
    products: Array.isArray(body.products) ? body.products : [],
  };
}