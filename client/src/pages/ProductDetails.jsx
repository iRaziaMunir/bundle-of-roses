import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Heart, Leaf, Truck } from "lucide-react";
import { useParams } from "react-router";
import { productDetailsBySlug } from "../data/productDetailsData";

const DETAIL_SECTIONS = [
  { key: "greeting-card", title: "Greeting Card", subtitle: "Complimentary" },
  { key: "scent", title: "Choose a Scent", subtitle: "Complimentary" },
  { key: "romantic-surprise", title: "Romantic Surprise", subtitle: "" },
];

const INFO_SECTIONS = [
  { key: "lasting", title: "How They Last 3+ Years" },
  { key: "shipping", title: "Shipping & Guaranteed Delivery" },
];

const getInitialSelectedColor = (colors = []) =>
  colors.find((item) => item.selected)?.name || colors[0]?.name || "";

const DetailAccordion = ({ title, subtitle, isOpen, onToggle, children }) => (
  <div className="border-b border-gray-300 py-4">
    <button className="w-full flex items-center justify-between text-left" onClick={onToggle}>
      <div className="flex items-center gap-2">
        <span className="text-sm tracking-widest uppercase">{title}</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        {subtitle ? <span>{subtitle}</span> : null}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
    </button>
    {isOpen ? <div className="pt-5">{children}</div> : null}
  </div>
);

export default function ProductDetails() {
  const { slug } = useParams();
  const product = useMemo(
    () =>
      productDetailsBySlug[slug] ||
      productDetailsBySlug["heart-black-box-light-pink-roses"],
    [slug]
  );

  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [openDetailSection, setOpenDetailSection] = useState("romantic-surprise");
  const [openInfoSection, setOpenInfoSection] = useState("");
  const [selectedFlowerColor, setSelectedFlowerColor] = useState(
    getInitialSelectedColor(product.flowerColors)
  );
  const [selectedBoxColor, setSelectedBoxColor] = useState(
    getInitialSelectedColor(product.boxColors)
  );

  useEffect(() => {
    setActiveImage(product.gallery[0]);
    setOpenDetailSection("romantic-surprise");
    setOpenInfoSection("");
    setSelectedFlowerColor(getInitialSelectedColor(product.flowerColors));
    setSelectedBoxColor(getInitialSelectedColor(product.boxColors));
  }, [product]);

  return (
    <section className="px-4 lg:px-8 py-6 lg:py-7 bg-[#f7f4f4]">
      <div className="max-w-[1450px] mx-auto grid grid-cols-1 xl:grid-cols-[80px_1fr_430px] gap-5 lg:gap-7">
        <div className="hidden xl:flex flex-col gap-3">
          {product.gallery.map((image, index) => (
            <button key={index} onClick={() => setActiveImage(image)} className="border border-gray-300">
              <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-14 object-cover" />
            </button>
          ))}
        </div>

        <div>
          <img src={activeImage} alt={product.name} className="w-full h-auto object-cover" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {product.gallery.slice(0, 3).map((image, index) => (
              <img key={index} src={image} alt={`${product.name} preview ${index + 1}`} className="w-full h-40 object-cover" />
            ))}
          </div>
        </div>

        <div className="bg-[#f7f4f4]">
          <h1 className="text-xl tracking-[0.25em] uppercase">{product.name}</h1>
          <p className="mt-2 text-sm">{"★".repeat(5)} <span className="text-gray-500">({product.reviews})</span></p>
          <p className="mt-2 text-3xl">{product.price}</p>
          <p className="text-sm text-gray-500 mt-1">{product.installment}</p>

          <ul className="mt-5 space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-3"><Leaf size={16} /> Real Preserved Roses. Lasts 3+ Years.</li>
            <li className="flex items-center gap-3"><Truck size={16} /> Complimentary US Delivery on all orders (3-5 Day)</li>
            <li className="flex items-center gap-3"><Heart size={16} /> Luxury Packaging. A Flawless Statement.</li>
          </ul>

          <div className="border-t border-gray-300 mt-6 pt-4">
            <p className="text-xs text-gray-600">Flower: {selectedFlowerColor}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.flowerColors.map((item) => (
                <button
                  key={item.name}
                  title={item.name}
                  aria-label={`Select flower color ${item.name}`}
                  aria-pressed={selectedFlowerColor === item.name}
                  onClick={() => setSelectedFlowerColor(item.name)}
                  className={`w-7 h-7 rounded-full border ${
                    selectedFlowerColor === item.name
                      ? "ring-1 ring-black ring-offset-2"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: item.hex }}
                />
              ))}
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs text-gray-600">Box: {selectedBoxColor}</p>
            <div className="flex gap-2 mt-2">
              {product.boxColors.map((item) => (
                <button
                  key={item.name}
                  title={item.name}
                  aria-label={`Select box color ${item.name}`}
                  aria-pressed={selectedBoxColor === item.name}
                  onClick={() => setSelectedBoxColor(item.name)}
                  className={`w-8 h-8 rounded-full border ${
                    selectedBoxColor === item.name
                      ? "ring-1 ring-black ring-offset-2"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: item.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-gray-300">
            {DETAIL_SECTIONS.map((section) => (
              <DetailAccordion
                key={section.key}
                title={section.title}
                subtitle={section.subtitle}
                isOpen={openDetailSection === section.key}
                onToggle={() =>
                  setOpenDetailSection((prev) => (prev === section.key ? "" : section.key))
                }
              >
                {section.key === "romantic-surprise" ? (
                  <div className="border border-gray-300 rounded-lg p-4">
                    <p className="text-sm">
                      An unlisted signature rose accompanies select orders above $500. Not presented. Not available for purchase.
                    </p>
                    <div className="w-full h-2 bg-gray-200 mt-3 rounded-full overflow-hidden">
                      <div className="h-full w-16 bg-black rounded-full" />
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <img src={product.gallery[1]} alt="Single rose" className="w-20 h-20 object-cover rounded-md border border-gray-300" />
                      <p className="font-semibold">Single White Suede Box | Red Rose</p>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button className="w-8 h-8 border border-gray-500 rounded-md inline-flex items-center justify-center"><ChevronLeft size={16} /></button>
                      <button className="w-8 h-8 border border-gray-500 rounded-md inline-flex items-center justify-center"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    Complimentary option selected at checkout.
                  </p>
                )}
              </DetailAccordion>
            ))}
          </div>

          <button className="w-full mt-6 border border-black bg-black text-white py-4 tracking-[0.35em] uppercase text-sm">
            Add to Cart
          </button>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-gray-700">
            {product.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-300">
            {INFO_SECTIONS.map((section) => (
              <DetailAccordion
                key={section.key}
                title={section.title}
                subtitle=""
                isOpen={openInfoSection === section.key}
                onToggle={() =>
                  setOpenInfoSection((prev) => (prev === section.key ? "" : section.key))
                }
              >
                <p className="text-sm text-gray-600">
                  {section.key === "lasting"
                    ? "Our roses are naturally preserved to hold their beauty for years without water."
                    : "Orders are carefully packed and shipped with reliable delivery tracking and support."}
                </p>
              </DetailAccordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

