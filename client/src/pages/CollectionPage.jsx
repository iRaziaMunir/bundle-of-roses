import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import HomeCollectionSectionProductCard from "../components/products/HomeCollectionSectionProductCard";
import {
  loadCollectionPage,
  resetCollectionPage,
  selectCollectionPageCollection,
  selectCollectionPageError,
  selectCollectionPageProducts,
  selectCollectionPageStatus,
} from "../redux/slices/collectionPageSlice";

export default function CollectionPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const collection = useSelector(selectCollectionPageCollection);
  const products = useSelector(selectCollectionPageProducts);
  const status = useSelector(selectCollectionPageStatus);
  const error = useSelector(selectCollectionPageError);

  useEffect(() => {
    if (!slug) return;
    dispatch(loadCollectionPage(slug));
    return () => {
      dispatch(resetCollectionPage());
    };
  }, [dispatch, slug]);

  if (status === "loading" || status === "idle") {
    return (
      <div className="min-h-[50vh] bg-[#f7f4f4] px-6 py-16 text-center text-sm text-gray-500">
        Loading collection…
      </div>
    );
  }

  if (status === "failed" || !collection) {
    return (
      <div className="min-h-[50vh] bg-[#f7f4f4] px-6 py-16">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-xl font-light tracking-widest uppercase text-[#1d1a1a]">Collection not found</h1>
          <p className="mt-3 text-sm text-gray-600">{error || "This collection is unavailable or has been removed."}</p>
          <Link to="/collections" className="mt-8 inline-block text-sm underline text-[#1d1a1a]">
            Back to collections
          </Link>
        </div>
      </div>
    );
  }

  const description = String(collection.description || "").trim();

  return (
    <div className="bg-[#f7f4f4] pb-16">
      <div className="max-w-[1450px] mx-auto px-6 lg:px-16 pt-10 lg:pt-14">
        <nav className="text-xs text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link to="/collections" className="hover:text-[#1d1a1a]">
            Collections
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-[#1d1a1a]">{collection.title}</span>
        </nav>

        <header className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-[#1d1a1a]">
            {collection.title}
          </h1>
          {description ? (
            <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">{description}</p>
          ) : null}
        </header>

        {products.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-12">No products in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {products.map((product) => (
              <HomeCollectionSectionProductCard key={product._id} product={product} imageMode="hover" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
