import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCollectionsBrowse } from "../../services/collectionsService";

const initialState = {
  collections: [],
  products: [],
  activeCollectionSlug: null,
  status: "idle",
  error: null,
};

export const loadCollectionsBrowse = createAsyncThunk(
  "collectionsBrowse/load",
  async (collectionSlug, { rejectWithValue, signal }) => {
    try {
      return await fetchCollectionsBrowse({
        collectionSlug: collectionSlug || undefined,
        abortSignal: signal,
      });
    } catch (error) {
      return rejectWithValue(error?.message || "Unable to load collections");
    }
  }
);

const collectionsBrowseSlice = createSlice({
  name: "collectionsBrowse",
  initialState,
  reducers: {
    resetCollectionsBrowse() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCollectionsBrowse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCollectionsBrowse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collections = action.payload.collections;
        state.products = action.payload.products;
        state.activeCollectionSlug = action.payload.activeCollectionSlug;
        state.error = null;
      })
      .addCase(loadCollectionsBrowse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unable to load collections";
        state.collections = [];
        state.products = [];
        state.activeCollectionSlug = null;
      });
  },
});

export const { resetCollectionsBrowse } = collectionsBrowseSlice.actions;

export const selectCollectionsBrowseCollections = (state) => state.collectionsBrowse.collections;
export const selectCollectionsBrowseProducts = (state) => state.collectionsBrowse.products;
export const selectCollectionsBrowseActiveSlug = (state) => state.collectionsBrowse.activeCollectionSlug;
export const selectCollectionsBrowseStatus = (state) => state.collectionsBrowse.status;
export const selectCollectionsBrowseError = (state) => state.collectionsBrowse.error;

export default collectionsBrowseSlice.reducer;
