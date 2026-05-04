import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Heart, Leaf, Truck } from "lucide-react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  loadStorefrontProductBySlug,
  resetProductDetail,
  selectProductDetailError,
  selectProductDetailProduct,
  selectProductDetailStatus,
} from "../redux/slices/productDetailSlice";
import { normalizeProductForDetailPage } from "../utils/productDetailNormalize";

const DETAIL_SECTIONS = [
  { key: "greeting-card", title: "Greeting Card", subtitle: "Complimentary" },
  { key: "scent", title: "Choose a Scent", subtitle: "Complimentary" },
  { key: "romantic-surprise", title: "Romantic Surprise", subtitle: "" },
];

const INFO_SECTIONS = [
  { key: "lasting", title: "How They Last 3+ Years" },
  { key: "shipping", title: "Shipping & Guaranteed Delivery" },
];

const DetailAccordion = ({ title, subtitle, isOpen, onToggle, children }) => (
  <div className="border-b border-gray-300 py-4">
    <button type="button" className="w-full flex items-center justify-between text-left" onClick={onToggle}>
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

function ProductDetailsInner({ detail }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openDetailSection, setOpenDetailSection] = useState("romantic-surprise");
  const [openInfoSection, setOpenInfoSection] = useState("");

  useEffect(() => {
    setActiveImageIndex(0);
  }, [detail.slug]);

  const activeImageUrl = detail.imageUrls[activeImageIndex] || "";
  const activeImageAlt = detail.imageAlts[activeImageIndex] || detail.title;
  const secondaryImageUrl = detail.imageUrls[1] || detail.imageUrls[0] || "";

  return (
    <section className="px-4 lg:px-8 py-6 lg:py-7 bg-[#f7f4f4]">
      <div className="max-w-[1450px] mx-auto grid grid-cols-1 xl:grid-cols-[80px_1fr_430px] gap-5 lg:gap-7">
        <div className="hidden xl:flex flex-col gap-3">
          {detail.imageUrls.map((url, index) => (
            <button
              key={`${index}-${url}`}
              type="button"
              onClick={() => setActiveImageIndex(index)}
              className={`border ${activeImageIndex === index ? "border-black" : "border-gray-300"}`}
            >
              <img
                src={url}
                alt={`${detail.title} thumbnail ${index + 1}`}
                className="w-full h-14 object-cover"
              />
            </button>
          ))}
        </div>

        <div>
          {activeImageUrl ? (
            <img src={activeImageUrl} alt={activeImageAlt} className="w-full h-auto object-cover" />
          ) : (
            <div className="w-full aspect-[4/5] bg-[#ebe4df]" aria-hidden />
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {detail.imageUrls.slice(0, 3).map((url, index) => (
              <button
                key={`preview-${index}-${url}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className="block w-full text-left"
              >
                <img
                  src={url}
                  alt={`${detail.title} preview ${index + 1}`}
                  className="w-full h-40 object-cover border border-transparent hover:border-gray-400"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#f7f4f4]">
          <h1 className="text-xl tracking-[0.25em] uppercase">{detail.title}</h1>
          <p className="mt-2 text-sm text-gray-600">Preserved roses · Hand finished</p>
          <p className="mt-2 text-3xl">{detail.formattedPrice}</p>
          <p className="text-sm text-gray-500 mt-1">
            {detail.inStock ? `${detail.quantity} in stock` : "Currently unavailable"}
          </p>

          <ul className="mt-5 space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-3">
              <Leaf size={16} /> Real preserved roses. Lasts 3+ years.
            </li>
            <li className="flex items-center gap-3">
              <Truck size={16} /> Complimentary US delivery on all orders (3–5 days)
            </li>
            <li className="flex items-center gap-3">
              <Heart size={16} /> Luxury packaging. A flawless statement.
            </li>
          </ul>

          <div className="border-t border-gray-300 mt-6 pt-4">
            <p className="text-xs text-gray-600">Rose color</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="w-7 h-7 rounded-full border border-gray-300"
                style={{ backgroundColor: detail.roseHex }}
                title={detail.roseColor}
              />
              <span className="text-sm text-gray-800">{detail.roseColor || "—"}</span>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs text-gray-600">Box color</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="w-8 h-8 rounded-full border border-gray-300"
                style={{ backgroundColor: detail.boxHex }}
                title={detail.boxColor}
              />
              <span className="text-sm text-gray-800">{detail.boxColor || "—"}</span>
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
                      An unlisted signature rose accompanies select orders above $500. Not presented. Not available for
                      purchase.
                    </p>
                    <div className="w-full h-2 bg-gray-200 mt-3 rounded-full overflow-hidden">
                      <div className="h-full w-16 bg-black rounded-full" />
                    </div>
                    {secondaryImageUrl ? (
                      <div className="flex items-center gap-4 mt-4">
                        <img
                          src={secondaryImageUrl}
                          alt=""
                          className="w-20 h-20 object-cover rounded-md border border-gray-300"
                        />
                        <p className="font-semibold text-sm">{detail.title}</p>
                      </div>
                    ) : null}
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        className="w-8 h-8 border border-gray-500 rounded-md inline-flex items-center justify-center"
                        aria-label="Previous"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        className="w-8 h-8 border border-gray-500 rounded-md inline-flex items-center justify-center"
                        aria-label="Next"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Complimentary option selected at checkout.</p>
                )}
              </DetailAccordion>
            ))}
          </div>

          <button
            type="button"
            disabled={!detail.inStock}
            className="w-full mt-6 border border-black bg-black text-white py-4 tracking-[0.35em] uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-gray-700">
            {detail.descriptionParagraphs.map((line, paragraphIndex) => (
              <p key={`${paragraphIndex}-${line.slice(0, 24)}`}>{line}</p>
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

export default function ProductDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const apiProduct = useSelector(selectProductDetailProduct);
  const status = useSelector(selectProductDetailStatus);
  const error = useSelector(selectProductDetailError);

  useEffect(() => {
    if (!slug) return;
    dispatch(loadStorefrontProductBySlug(slug));
    return () => {
      dispatch(resetProductDetail());
    };
  }, [dispatch, slug]);

  const detail = useMemo(() => (apiProduct ? normalizeProductForDetailPage(apiProduct) : null), [apiProduct]);

  if (status === "loading" || status === "idle") {
    return (
      <section className="px-4 lg:px-8 py-16 bg-[#f7f4f4] text-center text-sm text-gray-500">
        Loading product…
      </section>
    );
  }

  if (status === "failed" || !detail) {
    return (
      <section className="px-4 lg:px-8 py-16 bg-[#f7f4f4] text-center max-w-lg mx-auto">
        <h1 className="text-lg font-medium text-gray-900">Product not available</h1>
        <p className="mt-2 text-sm text-gray-600">{error || "We could not find this product."}</p>
        <Link to="/" className="mt-6 inline-block text-sm underline text-gray-800">
          Back to home
        </Link>
      </section>
    );
  }

  return <ProductDetailsInner key={detail.slug} detail={detail} />;
}
