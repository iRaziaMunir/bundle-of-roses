import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import Features from "../components/Features";
import collectionsHeroImage from "../assets/hero2.webp";
import HomeCollectionSectionProductCard from "../components/products/HomeCollectionSectionProductCard";
import {
  loadCollectionsBrowse,
  resetCollectionsBrowse,
  selectCollectionsBrowseCollections,
  selectCollectionsBrowseError,
  selectCollectionsBrowseProducts,
  selectCollectionsBrowseStatus,
} from "../redux/slices/collectionsBrowseSlice";

const COLLECTION_QUERY_KEY = "collection";

export default function CollectionsBrowsePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const collectionParam = (searchParams.get(COLLECTION_QUERY_KEY) || "").trim().toLowerCase();

  const collections = useSelector(selectCollectionsBrowseCollections);
  const products = useSelector(selectCollectionsBrowseProducts);
  const status = useSelector(selectCollectionsBrowseStatus);
  const error = useSelector(selectCollectionsBrowseError);

  useEffect(() => {
    dispatch(loadCollectionsBrowse(collectionParam || undefined));
  }, [dispatch, collectionParam]);

  useEffect(() => {
    return () => {
      dispatch(resetCollectionsBrowse());
    };
  }, [dispatch]);

  function selectAllCollections() {
    setSearchParams({}, { replace: true });
  }

  function selectCollectionSlug(slug) {
    const normalized = String(slug || "").trim().toLowerCase();
    if (!normalized) return;
    setSearchParams({ [COLLECTION_QUERY_KEY]: normalized }, { replace: true });
  }

  const activeCollectionTitle = collectionParam
    ? collections.find((c) => c.slug === collectionParam)?.title
    : null;

  const headingSubtitle = collectionParam
    ? activeCollectionTitle || "Collection"
    : "All collections";

  return (
    <>
      <section className="relative w-full h-[min(55vh,520px)] min-h-[280px]">
        <img
          src={collectionsHeroImage}
          alt="Luxury preserved roses"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/40" />
        <div className="relative z-10 h-full max-w-[1450px] mx-auto flex items-end px-6 lg:px-10 pb-10 sm:pb-12 md:pb-14">
          <div className="max-w-xl text-white">
            <p className="text-xs tracking-[0.3em] mb-3 text-white/90">THE MILLION ROSES®</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-[0.18em] uppercase">
              Shop by collection
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/85 leading-relaxed tracking-wide max-w-md">
              {collectionParam
                ? `You’re viewing ${headingSubtitle}. Use the sidebar to explore other series or see the full catalog.`
                : "Real preserved roses, organized by collection. Filter on the left or browse every arrangement in one place."}
            </p>
          </div>
        </div>
      </section>

      <Features />

      <div className="min-h-[calc(100vh-4rem)] bg-[#f7f4f4]">
        <div className="max-w-[1450px] mx-auto px-4 lg:px-8 py-10 lg:py-12">
          <header className="mb-10 lg:mb-12">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f7f7f]">Shop</p>
            <h2 className="mt-2 text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-[#1d1a1a]">
              {collectionParam ? headingSubtitle : "All collections"}
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              {collectionParam
                ? "Switch collections from the sidebar, or choose \"All collections\" to see every product."
                : "Browse every arrangement grouped by collection, or filter the list using the sidebar."}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr] gap-8 lg:gap-12 items-start">
            <aside className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-[24px] border border-[#eadfdf] bg-white/90 shadow-[0_12px_40px_rgba(42,26,26,0.06)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#eadfdf] bg-[#fcfaf8]">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#8f7f7f]">Filter</p>
                  <p className="mt-1 text-sm font-medium text-[#1d1a1a]">By collection</p>
                </div>
                <nav className="p-3 max-h-[min(70vh,520px)] overflow-y-auto" aria-label="Collections">
                  <button
                    type="button"
                    onClick={selectAllCollections}
                    className={[
                      "w-full text-left rounded-2xl px-4 py-3 text-sm transition-all duration-200",
                      !collectionParam
                        ? "bg-[#f7e6ea] text-[#1d1a1a] font-medium"
                        : "text-gray-600 hover:bg-[#fcfaf8] hover:text-[#1d1a1a]",
                    ].join(" ")}
                  >
                    <span className="block tracking-wide">All collections</span>
                    <span className="mt-0.5 block text-xs text-gray-500 font-normal">
                      Every product in any collection
                    </span>
                  </button>
                  <ul className="mt-2 space-y-1">
                    {collections.map((item) => {
                      const isActive = collectionParam === item.slug;
                      return (
                        <li key={item._id}>
                          <button
                            type="button"
                            onClick={() => selectCollectionSlug(item.slug)}
                            className={[
                              "w-full text-left rounded-2xl px-4 py-3 text-sm transition-all duration-200",
                              isActive
                                ? "bg-[#f7e6ea] text-[#1d1a1a] font-medium"
                                : "text-gray-600 hover:bg-[#fcfaf8] hover:text-[#1d1a1a]",
                            ].join(" ")}
                          >
                            <span className="block tracking-wide">{item.title}</span>
                            <span className="mt-0.5 block text-xs text-gray-500 font-normal">
                              {item.productCount} {item.productCount === 1 ? "product" : "products"}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>

            <main className="min-w-0">
              {status === "loading" || status === "idle" ? (
                <p className="text-center text-sm text-gray-500 py-16">Loading…</p>
              ) : null}

              {status === "failed" ? (
                <div className="rounded-[24px] border border-[#f1ccd7] bg-[#fff7f9] p-8 text-center">
                  <p className="text-sm font-medium text-[#8b4259]">{error}</p>
                  <button
                    type="button"
                    onClick={selectAllCollections}
                    className="mt-4 text-sm underline text-[#1d1a1a]"
                  >
                    View all collections
                  </button>
                </div>
              ) : null}

              {status === "succeeded" ? (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8">
                    <h2 className="text-lg font-light tracking-[0.18em] uppercase text-[#1d1a1a]">
                      {collectionParam ? headingSubtitle : "All products"}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      {products.length} {products.length === 1 ? "product" : "products"}
                    </p>
                  </div>

                  {products.length === 0 ? (
                    <p className="text-center text-sm text-gray-500 py-16 rounded-[24px] border border-dashed border-[#eadfdf] bg-white/50">
                      No products in this view yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
                      {products.map((product) => (
                        <HomeCollectionSectionProductCard
                          key={product._id}
                          product={product}
                          imageMode="hover"
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : null}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
