import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router";

export default function SearchOverlay({
  isOpen,
  query,
  onQueryChange,
  onClose,
  searchState,
}) {
  const inputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setActiveTab("products");
  }, [isOpen, query]);

  if (!isOpen) return null;

  const hasAnyResults =
    searchState.suggestions.length > 0 ||
    searchState.collections.length > 0 ||
    searchState.products.length > 0;

  return (
    <div className="fixed inset-0 z-[70] bg-[#f7f4f4]">
      <div className="border-b border-gray-300">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4 flex items-center gap-3">
          <Search size={18} className="text-gray-500" />
          <div className="w-full">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="SEARCH FOR..."
              className="w-full bg-transparent outline-none text-sm tracking-[0.35em] uppercase"
            />
          </div>
          <button
            aria-label="Close search"
            className="text-gray-500 hover:text-black"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {!hasAnyResults ? (
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10">
          <p className="text-sm text-gray-500">No results found. Try another keyword.</p>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-5 pb-10 overflow-y-auto max-h-[calc(100vh-74px)]">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <div>
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-3">Suggestions</h3>
              <ul className="border-t border-gray-300 pt-4 space-y-3">
                {searchState.suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      className="text-left text-sm hover:text-gray-500"
                      onClick={() => onQueryChange(suggestion)}
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-8 border-b border-gray-300 mb-4">
                <button
                  className={`pb-2 text-[10px] tracking-[0.3em] uppercase border-b ${
                    activeTab === "products"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500"
                  }`}
                  onClick={() => setActiveTab("products")}
                >
                  Products
                </button>
                <button
                  className={`pb-2 text-[10px] tracking-[0.3em] uppercase border-b ${
                    activeTab === "collections"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500"
                  }`}
                  onClick={() => setActiveTab("collections")}
                >
                  Collections
                </button>
              </div>

              {activeTab === "products" ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {searchState.products.map((product) => (
                      <Link key={product.id} to={product.to} onClick={onClose} className="block">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="pt-3 text-center">
                          <p className="text-xs">{product.name}</p>
                          <p className="text-xs text-gray-500 mt-1">({product.reviews})</p>
                          <p className="text-sm mt-1">{product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link
                    to={`/search/${encodeURIComponent(query.trim() || "all")}`}
                    onClick={onClose}
                    className="mt-8 mx-auto block w-fit border border-[#d9c7ce] bg-[#eadde1] px-10 py-3 text-[11px] tracking-[0.3em] uppercase hover:bg-[#e2d1d8] transition-colors"
                  >
                    View all results
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {searchState.collections.map((collection) => (
                    <li key={collection.label}>
                      <Link to={collection.to} onClick={onClose} className="text-sm hover:text-gray-500">
                        {collection.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

