import { useMemo } from "react";

const normalize = (value) => value.toLowerCase().trim();

const includesNormalized = (value, query) => normalize(value).includes(query);

export default function useSearchResults({
  query,
  suggestions,
  collections,
  products,
  maxSuggestions = 10,
  maxCollections = 6,
  maxProducts = 6,
}) {
  return useMemo(() => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      return {
        suggestions: suggestions.slice(0, maxSuggestions),
        collections: collections.slice(0, maxCollections),
        products: products.slice(0, maxProducts),
      };
    }

    const filteredSuggestions = suggestions
      .filter((item) => includesNormalized(item, normalizedQuery))
      .slice(0, maxSuggestions);

    const filteredCollections = collections
      .filter((item) => includesNormalized(item.label, normalizedQuery))
      .slice(0, maxCollections);

    const filteredProducts = products
      .filter((item) => includesNormalized(item.name, normalizedQuery))
      .slice(0, maxProducts);

    return {
      suggestions: filteredSuggestions,
      collections: filteredCollections,
      products: filteredProducts,
    };
  }, [
    collections,
    maxCollections,
    maxProducts,
    maxSuggestions,
    products,
    query,
    suggestions,
  ]);
}

