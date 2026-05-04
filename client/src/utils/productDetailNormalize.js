import { formatStorefrontPrice } from "./storefrontProductDisplay";

const ROSE_COLOR_HEX = {
  Red: "#b91c1c",
  Black: "#171717",
  Pink: "#f9a8d4",
  White: "#f5f5f4",
  "Light Pink": "#fbcfe8",
  Burgundy: "#7f1d1d",
  Purple: "#7c3aed",
  Blue: "#2563eb",
  Yellow: "#eab308",
  Orange: "#ea580c",
};

const BOX_COLOR_HEX = {
  Beige: "#d6c4b4",
  Black: "#171717",
  White: "#fafafa",
  Pink: "#fce7f3",
  Gold: "#ca8a04",
  Bordeaux: "#581c3a",
};

function hexForRoseColor(colorName) {
  if (!colorName) return "#9ca3af";
  return ROSE_COLOR_HEX[colorName] || "#9ca3af";
}

function hexForBoxColor(colorName) {
  if (!colorName) return "#d1d5db";
  return BOX_COLOR_HEX[colorName] || "#d1d5db";
}

/**
 * Maps API product (Product model) to the shape ProductDetails UI expects.
 */
export function normalizeProductForDetailPage(apiProduct) {
  const images = Array.isArray(apiProduct?.images) ? apiProduct.images : [];
  const imageUrls = images.map((img) => img?.url).filter(Boolean);
  const imageAlts = images.map((img) => img?.alt || apiProduct?.title || "Product");

  let descriptionParagraphs = String(apiProduct?.description || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (descriptionParagraphs.length === 0) {
    descriptionParagraphs = ["Details for this arrangement will appear here."];
  }

  const quantity = apiProduct?.quantity ?? 0;

  return {
    title: apiProduct?.title || "Product",
    slug: apiProduct?.slug || "",
    imageUrls,
    imageAlts,
    descriptionParagraphs,
    formattedPrice: formatStorefrontPrice(apiProduct?.price),
    roseColor: apiProduct?.roseColor || "",
    boxColor: apiProduct?.boxColor || "",
    roseHex: hexForRoseColor(apiProduct?.roseColor),
    boxHex: hexForBoxColor(apiProduct?.boxColor),
    quantity,
    inStock: quantity > 0,
  };
}
