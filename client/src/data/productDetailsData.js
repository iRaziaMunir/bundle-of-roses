import main1 from "../assets/products/mostGifted/mostGifted1.0.webp";
import main2 from "../assets/products/mostGifted/mostGifted1.webp";
import main3 from "../assets/products/mostGifted/mostGifted2.webp";
import main4 from "../assets/products/mostGifted/mostGifted2.0.webp";
import main5 from "../assets/products/mostGifted/mostGifted3.webp";
import main6 from "../assets/products/mostGifted/MostGifted3.0.webp";

export const productDetailsBySlug = {
  "heart-black-box-light-pink-roses": {
    name: "Heart Black Box | Light Pink Roses",
    price: "$450.00",
    installment: "$112.50 in 4 interest free payments",
    reviews: 854,
    description: [
      "Our Heart collection features light pink roses in our hand-crafted black heart-shaped box. There is no better gift for Valentine's Day, a birthday, an anniversary, or just because.",
      "With the most natural appearance of any roses on the market, this beautiful box design is the ultimate I love you. It looks perfect in the bedroom or displayed on your coffee table - a dose of love for the one who has your heart or as a gift for yourself.",
      "Box size: 10''",
      "Number of roses: 25-30",
    ],
    gallery: [main1, main2, main3, main4, main5, main6],
    flowerColors: [
      { name: "Light Pink", hex: "#f7d5dc", selected: true },
      { name: "Blush", hex: "#f0c7ca" },
      { name: "Champagne", hex: "#c3a46f" },
      { name: "Rust", hex: "#9d4f2e" },
      { name: "Red", hex: "#89151f" },
      { name: "Purple", hex: "#7f1ac6" },
      { name: "Black", hex: "#080808" },
      { name: "Yellow", hex: "#f0bf19" },
    ],
    boxColors: [
      { name: "Black", hex: "#0f0f0f", selected: true },
      { name: "White", hex: "#efefef" },
      { name: "Pink", hex: "#dcb9c7" },
    ],
  },
  "classic-black-box-red-roses": {
    name: "Classic Black Box | Red Roses",
    price: "$300.00",
    installment: "$75.00 in 4 interest free payments",
    reviews: 1540,
    description: [
      "Classic red roses in our signature black box deliver timeless impact for celebrations and meaningful moments.",
      "Designed to keep their shape and elegance for years, each arrangement is handcrafted to feel modern and luxurious.",
      "Box size: 8''",
      "Number of roses: 18-20",
    ],
    gallery: [main3, main4, main5, main1],
    flowerColors: [
      { name: "Red", hex: "#89151f", selected: true },
      { name: "Pink", hex: "#f7d5dc" },
      { name: "White", hex: "#f2f2f2" },
      { name: "Black", hex: "#080808" },
    ],
    boxColors: [
      { name: "Black", hex: "#0f0f0f", selected: true },
      { name: "White", hex: "#efefef" },
    ],
  },
  "heart-black-box-black-roses": {
    name: "Heart Black Box | Black Roses",
    price: "$450.00",
    installment: "$112.50 in 4 interest free payments",
    reviews: 854,
    description: [
      "A dramatic heart arrangement with black preserved roses for statement gifting and elevated interiors.",
      "Each bloom is naturally preserved to maintain rich texture and color for years with no watering needed.",
      "Box size: 10''",
      "Number of roses: 25-30",
    ],
    gallery: [main5, main6, main3, main4],
    flowerColors: [
      { name: "Black", hex: "#080808", selected: true },
      { name: "Red", hex: "#89151f" },
      { name: "Purple", hex: "#7f1ac6" },
      { name: "Pink", hex: "#f7d5dc" },
    ],
    boxColors: [
      { name: "Black", hex: "#0f0f0f", selected: true },
      { name: "White", hex: "#efefef" },
      { name: "Pink", hex: "#dcb9c7" },
    ],
  },
};

