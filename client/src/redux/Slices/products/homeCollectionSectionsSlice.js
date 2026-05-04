import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCollectionProductsBySlug } from "../../../services/collectionsService";
import {
  HOME_COLLECTION_SECTION_DEFAULTS,
  HOME_COLLECTION_SECTION_IDS,
} from "../../../constants/homeCollectionSections";

function createEmptySectionState({ collectionSlug, productsLimit }) {
  return {
    collectionSlug,
    productsLimit,
    collectionTitle: "",
    items: [],
    status: "idle",
    error: null,
    lastFetchedAt: 0,
    ttlMs: 60_000,
  };
}

const initialState = {
  sections: {
    [HOME_COLLECTION_SECTION_IDS.HERITAGE]: createEmptySectionState(
      HOME_COLLECTION_SECTION_DEFAULTS[HOME_COLLECTION_SECTION_IDS.HERITAGE]
    ),
    [HOME_COLLECTION_SECTION_IDS.MOST_GIFTED]: createEmptySectionState(
      HOME_COLLECTION_SECTION_DEFAULTS[HOME_COLLECTION_SECTION_IDS.MOST_GIFTED]
    ),
    [HOME_COLLECTION_SECTION_IDS.HEART]: createEmptySectionState(
      HOME_COLLECTION_SECTION_DEFAULTS[HOME_COLLECTION_SECTION_IDS.HEART]
    ),
    [HOME_COLLECTION_SECTION_IDS.GRAND_GESTURES]: createEmptySectionState(
      HOME_COLLECTION_SECTION_DEFAULTS[HOME_COLLECTION_SECTION_IDS.GRAND_GESTURES]
    ),
    [HOME_COLLECTION_SECTION_IDS.SMALL_SURPRISES]: createEmptySectionState(
      HOME_COLLECTION_SECTION_DEFAULTS[HOME_COLLECTION_SECTION_IDS.SMALL_SURPRISES]
    ),
  },
};

export const loadHomeCollectionSectionProducts = createAsyncThunk(
  "homeCollectionSections/loadSectionProducts",
  async ({ sectionId }, { getState, rejectWithValue, signal }) => {
    try {
      const sectionState = getState().homeCollectionSections.sections[sectionId];
      if (!sectionState) {
        return rejectWithValue("Unknown home collection section");
      }

      const apiResult = await getCollectionProductsBySlug({
        slug: sectionState.collectionSlug,
        limit: sectionState.productsLimit,
        signal,
      });

      return {
        sectionId,
        collectionTitle: apiResult.title,
        products: apiResult.products,
      };
    } catch (error) {
      return rejectWithValue(error?.message || "Unable to load collection products");
    }
  },
  {
    condition: ({ sectionId }, { getState }) => {
      const sectionState = getState().homeCollectionSections.sections[sectionId];
      if (!sectionState) return false;
      if (sectionState.status === "loading") return false;

      const now = Date.now();
      const cacheIsFresh =
        sectionState.lastFetchedAt > 0 && now - sectionState.lastFetchedAt < sectionState.ttlMs;
      if (cacheIsFresh) return false;

      return true;
    },
  }
);

const homeCollectionSectionsSlice = createSlice({
  name: "homeCollectionSections",
  initialState,
  reducers: {
    setHomeSectionCollectionSlug(state, action) {
      const { sectionId, collectionSlug } = action.payload;
      const sectionState = state.sections[sectionId];
      if (!sectionState) return;
      sectionState.collectionSlug = collectionSlug;
      sectionState.lastFetchedAt = 0;
    },
    setHomeSectionProductsLimit(state, action) {
      const { sectionId, productsLimit } = action.payload;
      const sectionState = state.sections[sectionId];
      if (!sectionState) return;
      sectionState.productsLimit = productsLimit;
      sectionState.lastFetchedAt = 0;
    },
    invalidateHomeCollectionSection(state, action) {
      const sectionId = action.payload;
      const sectionState = state.sections[sectionId];
      if (!sectionState) return;
      sectionState.lastFetchedAt = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHomeCollectionSectionProducts.pending, (state, action) => {
        const sectionId = action.meta.arg.sectionId;
        const sectionState = state.sections[sectionId];
        if (!sectionState) return;
        sectionState.status = "loading";
        sectionState.error = null;
      })
      .addCase(loadHomeCollectionSectionProducts.fulfilled, (state, action) => {
        const { sectionId, collectionTitle, products } = action.payload;
        const sectionState = state.sections[sectionId];
        if (!sectionState) return;
        sectionState.status = "succeeded";
        sectionState.collectionTitle = collectionTitle;
        sectionState.items = Array.isArray(products) ? products : [];
        sectionState.lastFetchedAt = Date.now();
      })
      .addCase(loadHomeCollectionSectionProducts.rejected, (state, action) => {
        const sectionId = action.meta.arg.sectionId;
        const sectionState = state.sections[sectionId];
        if (!sectionState) return;
        sectionState.status = "failed";
        sectionState.error = action.payload || "Unable to load collection products";
      });
  },
});

export const {
  setHomeSectionCollectionSlug,
  setHomeSectionProductsLimit,
  invalidateHomeCollectionSection,
} = homeCollectionSectionsSlice.actions;

export const selectHomeCollectionSection = (sectionId) => (rootState) =>
  rootState.homeCollectionSections.sections[sectionId];

export default homeCollectionSectionsSlice.reducer;
