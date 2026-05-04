import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCollectionProductsBySlug } from "../../../services/collectionsService";

const initialState = {

  slug: "most-loved",
  limit: 4,
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  collectionTitle: "",
  // performance cache
  lastFetchedAt: 0,
  ttlMs: 60_000,
};

export const loadLovedProducts = createAsyncThunk(
  "lovedProducts/load",
  async (_, { getState, rejectWithValue, signal }) => {
    try {
      const state = getState().lovedProducts;

      const data = await getCollectionProductsBySlug({
        slug: state.slug,
        limit: state.limit,
        signal,
      });

      return data;
    } catch (err) {
      return rejectWithValue(err?.message || "Unable to load loved products");
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().lovedProducts;
      const now = Date.now();

      if (state.status === "loading") return false;
      if (state.lastFetchedAt && now - state.lastFetchedAt < state.ttlMs) return false;

      return true;
    },
  }
);

const lovedProductsSlice = createSlice({
  name: "lovedProducts",
  initialState,
  reducers: {
    setLovedProductsLimit(state, action) {
      state.limit = action.payload;
      state.lastFetchedAt = 0;
    },
    setLovedProductsSlug(state, action) {
      state.slug = action.payload;
      state.lastFetchedAt = 0;
    },
    invalidateLovedProducts(state) {
      state.lastFetchedAt = 0;
    },
    clearLovedProductsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLovedProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadLovedProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collectionTitle = action.payload?.title || "";
        state.items = Array.isArray(action.payload?.products) ? action.payload.products : [];
        state.lastFetchedAt = Date.now();
      })
      .addCase(loadLovedProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unable to load loved products";
      });
  },
});

export const {
  setLovedProductsLimit,
  setLovedProductsSlug,
  invalidateLovedProducts,
  clearLovedProductsError,
} = lovedProductsSlice.actions;

export const selectLovedProductsItems = (state) => state.lovedProducts.items;
export const selectLovedProductsStatus = (state) => state.lovedProducts.status;
export const selectLovedProductsError = (state) => state.lovedProducts.error;
export const selectLovedProductsTitle = (state) => state.lovedProducts.collectionTitle;

export default lovedProductsSlice.reducer;