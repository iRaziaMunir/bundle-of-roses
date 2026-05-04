const customProductSlugByName = {
  "Heart Black Box | Light Pink Roses": "heart-black-box-light-pink-roses",
  "Classic Black Box | Red Roses": "classic-black-box-red-roses",
  "Heart Black Box | Black Roses": "heart-black-box-black-roses",
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getProductPath = (productName) => {
  const slug = customProductSlugByName[productName] || slugify(productName);
  return `/category/products/${slug}`;
};

