import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStorefrontProductBySlug } from "../../services/storefrontProductsService";

const initialState = {
  product: null,
  status: "idle",
  error: null,
};

export const loadStorefrontProductBySlug = createAsyncThunk(
  "productDetail/loadBySlug",
  async (slug, { rejectWithValue, signal }) => {
    try {
      return await fetchStorefrontProductBySlug(slug, { abortSignal: signal });
    } catch (error) {
      return rejectWithValue(error?.message || "Unable to load product");
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    resetProductDetail() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStorefrontProductBySlug.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.product = null;
      })
      .addCase(loadStorefrontProductBySlug.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
        state.error = null;
      })
      .addCase(loadStorefrontProductBySlug.rejected, (state, action) => {
        state.status = "failed";
        state.product = null;
        state.error = action.payload || "Unable to load product";
      });
  },
});

export const { resetProductDetail } = productDetailSlice.actions;

export const selectProductDetailProduct = (state) => state.productDetail.product;
export const selectProductDetailStatus = (state) => state.productDetail.status;
export const selectProductDetailError = (state) => state.productDetail.error;

export default productDetailSlice.reducer;
