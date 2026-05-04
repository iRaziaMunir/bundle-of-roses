const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const categoryPath = (group, label) => `/category/${group}/${slugify(label)}`;

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Flowers", to: "/flowers" },
  { label: "Collections", to: "/collections" },
  { label: "Best Sellers", to: "/best-sellers" },
  { label: "Mother's Day", to: "/mothers-day" },
];

export const flowersMobileSections = [
  {
    key: "size",
    title: "Shop By Size",
    links: [
      { label: "Acrylic", to: categoryPath("size", "Acrylic") },
      { label: "One In a Million", to: categoryPath("size", "One In a Million") },
      { label: "Baby Heart", to: categoryPath("size", "Baby Heart") },
      { label: "Basic", to: categoryPath("size", "Basic") },
      { label: "Classic", to: categoryPath("size", "Classic") },
      { label: "Supreme", to: categoryPath("size", "Supreme") },
      { label: "Heart", to: categoryPath("size", "Heart") },
      { label: "Long Stem Roses", to: categoryPath("size", "Long Stem Roses") },
      { label: "Luxe", to: categoryPath("size", "Luxe") },
      { label: "Superdome", to: categoryPath("size", "Superdome") },
    ],
  },
  {
    key: "color",
    title: "Shop By Color",
    links: [
      { label: "Red Roses", to: categoryPath("color", "Red Roses") },
      { label: "Pink Roses", to: categoryPath("color", "Pink Roses") },
      { label: "Burgundy Roses", to: categoryPath("color", "Burgundy Roses") },
      { label: "Blue Roses", to: categoryPath("color", "Blue Roses") },
      { label: "Black Roses", to: categoryPath("color", "Black Roses") },
      { label: "White Roses", to: categoryPath("color", "White Roses") },
      { label: "Gold Roses", to: categoryPath("color", "Gold Roses") },
      { label: "Purple Roses", to: categoryPath("color", "Purple Roses") },
      { label: "Yellow Roses", to: categoryPath("color", "Yellow Roses") },
      { label: "Orange Roses", to: categoryPath("color", "Orange Roses") },
    ],
  },
  {
    key: "occasion",
    title: "Shop By Occasion",
    links: [
      { label: "Romantic Gift", to: categoryPath("occasion", "Romantic Gift") },
      { label: "Birthday Gift", to: categoryPath("occasion", "Birthday Gift") },
      { label: "Anniversary Gift", to: categoryPath("occasion", "Anniversary Gift") },
      { label: "Baby Shower", to: categoryPath("occasion", "Baby Shower") },
      { label: "Thank You Gift", to: categoryPath("occasion", "Thank You Gift") },
      { label: "Corporate Gift", to: categoryPath("occasion", "Corporate Gift") },
      { label: "Wedding Present", to: categoryPath("occasion", "Wedding Present") },
      { label: "Home Decor", to: categoryPath("occasion", "Home Decor") },
      { label: "Engagement", to: categoryPath("occasion", "Engagement") },
      { label: "Sympathy Flowers", to: categoryPath("occasion", "Sympathy Flowers") },
    ],
  },
];

export const collectionsMobileSections = [
  {
    key: "specialty",
    title: "Specialty Collections",
    links: [
      { label: "Beige Suede", to: categoryPath("specialty", "Beige Suede") },
      { label: "Buttercup", to: categoryPath("specialty", "Buttercup") },
      { label: "Crystal Collection", to: categoryPath("specialty", "Crystal Collection") },
      { label: "Sunflower", to: categoryPath("specialty", "Sunflower") },
    ],
  },
  {
    key: "seasonal",
    title: "Seasonal Collections",
    links: [
      { label: "Pisces Season", to: categoryPath("seasonal", "Pisces Season") },
      { label: "Basic Garden", to: categoryPath("seasonal", "Basic Garden") },
      { label: "Baby Hearts", to: categoryPath("seasonal", "Baby Hearts") },
      { label: "Mother's Day", to: categoryPath("seasonal", "Mother's Day") },
    ],
  },
];

export const mothersDayMobileLinks = [
  { label: "The Heritage Collection", to: categoryPath("mothers-day", "The Heritage Collection") },
  { label: "The Absolute Editions", to: categoryPath("mothers-day", "The Absolute Editions") },
];

export const featuredSearchProducts = [
  "Heart Black Box | Red Roses",
  "Luxury Pink Box | Roses",
  "Classic White Box | Light Pink Roses",
  "Basic Beige Suede Superdome Box | White Roses",
  "Supreme Beige Box | White Roses",
];

export const searchSuggestions = [
  "black roses",
  "black",
  "black rose",
  "supreme black box",
  "black and white",
  "black box white roses",
  "red roses black box",
  "basic black box red roses",
  "square black box",
  "pink roses black box",
];

export const searchCollections = [
  { label: "Black Roses Collection", to: categoryPath("collections", "Black Roses Collection") },
  { label: "Heart Collection", to: categoryPath("collections", "Heart Collection") },
  { label: "Heritage Collection", to: categoryPath("collections", "Heritage Collection") },
  { label: "Specialty Collections", to: categoryPath("collections", "Specialty Collections") },
  { label: "Seasonal Collections", to: categoryPath("collections", "Seasonal Collections") },
];

export const searchableProducts = [
  {
    id: "heart-light-pink",
    name: "Heart Black Box | Light Pink Roses",
    price: "$450.00",
    reviews: 854,
    image:
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1000",
    to: categoryPath("products", "Heart Black Box | Light Pink Roses"),
  },
  {
    id: "classic-red",
    name: "Classic Black Box | Red Roses",
    price: "$300.00",
    reviews: 1540,
    image:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000",
    to: categoryPath("products", "Classic Black Box | Red Roses"),
  },
  {
    id: "heart-black",
    name: "Heart Black Box | Black Roses",
    price: "$450.00",
    reviews: 854,
    image:
      "https://images.unsplash.com/photo-1549218023-5b3f0f03c4df?q=80&w=1000",
    to: categoryPath("products", "Heart Black Box | Black Roses"),
  },
];

