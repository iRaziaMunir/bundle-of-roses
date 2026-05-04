export function formatStorefrontPrice(price) {
  const amount = price?.amount;
  const currency = price?.currency || "USD";
  if (typeof amount !== "number") return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getProductDetailPath(productSlug) {
  return `/category/products/${String(productSlug || "").trim()}`;
}

export function getStorefrontProductImageUrls(product) {
  const images = Array.isArray(product?.images) ? product.images : [];
  const first = images[0];
  const second = images[1];
  const primaryUrl = first?.url || "";
  const primaryAlt = first?.alt || product?.title || "Product";
  const hoverUrl = second?.url || primaryUrl;
  const hoverAlt = second?.alt || primaryAlt;
  return { primaryUrl, primaryAlt, hoverUrl, hoverAlt };
}
