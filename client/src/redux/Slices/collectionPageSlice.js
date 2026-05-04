import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCollectionWithProductsBySlug } from "../../services/collectionsService";

const initialState = {
  collection: null,
  products: [],
  status: "idle",
  error: null,
};

export const loadCollectionPage = createAsyncThunk(
  "collectionPage/load",
  async (slug, { rejectWithValue, signal }) => {
    try {
      return await fetchCollectionWithProductsBySlug(slug, { abortSignal: signal });
    } catch (error) {
      return rejectWithValue(error?.message || "Unable to load collection");
    }
  }
);

const collectionPageSlice = createSlice({
  name: "collectionPage",
  initialState,
  reducers: {
    resetCollectionPage() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCollectionPage.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.collection = null;
        state.products = [];
      })
      .addCase(loadCollectionPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collection = action.payload.collection;
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(loadCollectionPage.rejected, (state, action) => {
        state.status = "failed";
        state.collection = null;
        state.products = [];
        state.error = action.payload || "Unable to load collection";
      });
  },
});

export const { resetCollectionPage } = collectionPageSlice.actions;

export const selectCollectionPageCollection = (state) => state.collectionPage.collection;
export const selectCollectionPageProducts = (state) => state.collectionPage.products;
export const selectCollectionPageStatus = (state) => state.collectionPage.status;
export const selectCollectionPageError = (state) => state.collectionPage.error;

export default collectionPageSlice.reducer;
