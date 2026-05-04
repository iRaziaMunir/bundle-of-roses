/**
 * Section keys for Redux state. Slugs must match Collection.slug in the database (admin).
 */
export const HOME_COLLECTION_SECTION_IDS = {
  HERITAGE: "heritageCollection",
  MOST_GIFTED: "mostGifted",
  HEART: "heartCollection",
  GRAND_GESTURES: "grandGestures",
  SMALL_SURPRISES: "smallSurprises",
};

export const HOME_COLLECTION_SECTION_DEFAULTS = {
  [HOME_COLLECTION_SECTION_IDS.HERITAGE]: {
    collectionSlug: "the-heritage-collection",
    productsLimit: 4,
  },
  [HOME_COLLECTION_SECTION_IDS.MOST_GIFTED]: {
    collectionSlug: "most-gifted",
    productsLimit: 6,
  },
  [HOME_COLLECTION_SECTION_IDS.HEART]: {
    collectionSlug: "heart-collection",
    productsLimit: 6,
  },
  [HOME_COLLECTION_SECTION_IDS.GRAND_GESTURES]: {
    collectionSlug: "grand-gestures",
    productsLimit: 6,
  },
  [HOME_COLLECTION_SECTION_IDS.SMALL_SURPRISES]: {
    collectionSlug: "small-surprises",
    productsLimit: 8,
  },
};
