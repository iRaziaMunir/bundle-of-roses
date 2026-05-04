import { Plus } from "lucide-react";
import { Link } from "react-router";
import {
  formatStorefrontPrice,
  getProductDetailPath,
  getStorefrontProductImageUrls,
} from "../../utils/storefrontProductDisplay";

/**
 * @param {object} props
 * @param {object} props.product — API product shape
 * @param {"single" | "hover"} props.imageMode — one image or crossfade hover (second image if present)
 */
export default function HomeCollectionSectionProductCard({ product, imageMode = "hover" }) {
  const to = getProductDetailPath(product.slug);
  const { primaryUrl, primaryAlt, hoverUrl, hoverAlt } = getStorefrontProductImageUrls(product);
  const priceLabel = formatStorefrontPrice(product.price);

  return (
    <Link to={to} className="group block">
      <div className="relative overflow-hidden cursor-pointer">
        {imageMode === "single" ? (
          primaryUrl ? (
            <img src={primaryUrl} alt={primaryAlt} className="w-full h-80 object-cover transition duration-500" />
          ) : (
            <div className="w-full h-80 bg-[#f5f0ec]" aria-hidden />
          )
        ) : (
          <>
            {primaryUrl ? (
              <img
                src={primaryUrl}
                alt={primaryAlt}
                className="w-full h-80 object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
              />
            ) : (
              <div className="w-full h-80 bg-[#f5f0ec] absolute inset-0" aria-hidden />
            )}
            {hoverUrl ? (
              <img
                src={hoverUrl}
                alt={hoverAlt}
                className="w-full h-80 object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              />
            ) : (
              <div className="w-full h-80 bg-[#ebe4df] transition-opacity duration-500 opacity-0 group-hover:opacity-100" aria-hidden />
            )}
          </>
        )}

        <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-black text-white px-4 py-2 text-xs tracking-widest opacity-0 group-hover:opacity-100 transition duration pointer-events-none">
          <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" aria-hidden />
        </span>
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-sm mb-1 font-normal">{product.title}</h3>
        {priceLabel ? <p className="text-sm text-gray-500 mt-1">{priceLabel}</p> : null}
      </div>
    </Link>
  );
}
