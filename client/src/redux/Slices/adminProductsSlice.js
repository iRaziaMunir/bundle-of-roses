import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  archiveAdminProduct,
  adjustAdminProductInventory,
  createAdminProduct,
  fetchAdminProducts,
  permanentlyDeleteAdminProduct,
  updateAdminProduct,
} from "../../api/adminProductsApi";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  filters: {
    status: "",
  },
  mutationStatus: "idle",
  mutationError: null,
};

function formatCurrency(price) {
  if (!price || typeof price.amount !== "number") {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency || "USD",
    maximumFractionDigits: 0,
  }).format(price.amount);
}

function mapProductToRow(product) {
  return {
    id: product._id,
    title: product.title,
    slug: product.slug,
    collection: "Unassigned",
    inventory: product.quantity ?? 0,
    price: formatCurrency(product.price),
    status: product.status === "active" ? "Active" : product.status === "draft" ? "Draft" : "Archived",
  };
}

export const loadAdminProducts = createAsyncThunk(
  "adminProducts/loadAdminProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await fetchAdminProducts(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Unable to load admin products");
    }
  }
);

export const createAdminProductThunk = createAsyncThunk(
  "adminProducts/create",
  async (payload, { rejectWithValue }) => {
    try {
      return await createAdminProduct(payload);
    } catch (error) {
      return rejectWithValue(error.message || "Unable to create product");
    }
  }
);

export const updateAdminProductThunk = createAsyncThunk(
  "adminProducts/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateAdminProduct(id, payload);
    } catch (error) {
      return rejectWithValue(error.message || "Unable to update product");
    }
  }
);

export const archiveAdminProductThunk = createAsyncThunk(
  "adminProducts/archive",
  async (id, { rejectWithValue }) => {
    try {
      return await archiveAdminProduct(id);
    } catch (error) {
      return rejectWithValue(error.message || "Unable to archive product");
    }
  }
);

export const permanentlyDeleteAdminProductThunk = createAsyncThunk(
  "adminProducts/permanentDelete",
  async (id, { rejectWithValue }) => {
    try {
      return await permanentlyDeleteAdminProduct(id);
    } catch (error) {
      return rejectWithValue(error.message || "Unable to delete product");
    }
  }
);

export const adjustAdminProductInventoryThunk = createAsyncThunk(
  "adminProducts/inventoryAdjust",
  async ({ productId, payload }, { rejectWithValue }) => {
    try {
      return await adjustAdminProductInventory(productId, payload);
    } catch (error) {
      return rejectWithValue(error.message || "Unable to adjust inventory");
    }
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    setAdminProductsStatusFilter(state, action) {
      state.filters.status = action.payload;
    },
    clearAdminProductsError(state) {
      state.error = null;
    },
    resetMutationState(state) {
      state.mutationStatus = "idle";
      state.mutationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAdminProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadAdminProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(loadAdminProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unable to load admin products";
      });

    builder
      .addCase(createAdminProductThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(createAdminProductThunk.fulfilled, (state) => {
        state.mutationStatus = "succeeded";
      })
      .addCase(createAdminProductThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload || "Unable to create product";
      })
      .addCase(updateAdminProductThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(updateAdminProductThunk.fulfilled, (state) => {
        state.mutationStatus = "succeeded";
      })
      .addCase(updateAdminProductThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload || "Unable to update product";
      })
      .addCase(archiveAdminProductThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(archiveAdminProductThunk.fulfilled, (state) => {
        state.mutationStatus = "succeeded";
      })
      .addCase(archiveAdminProductThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload || "Unable to archive product";
      })
      .addCase(permanentlyDeleteAdminProductThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(permanentlyDeleteAdminProductThunk.fulfilled, (state) => {
        state.mutationStatus = "succeeded";
      })
      .addCase(permanentlyDeleteAdminProductThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload || "Unable to delete product";
      });

    builder
      .addCase(adjustAdminProductInventoryThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(adjustAdminProductInventoryThunk.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        const product = action.payload?.product;
        if (product && product._id) {
          const idx = state.items.findIndex((p) => p._id === product._id);
          if (idx >= 0) state.items[idx] = product;
        }
      })
      .addCase(adjustAdminProductInventoryThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload || "Unable to adjust inventory";
      });
  },
});

export const { setAdminProductsStatusFilter, clearAdminProductsError, resetMutationState } = adminProductsSlice.actions;

export const selectAdminProductsState = (state) => state.adminProducts;
export const selectAdminProductsItems = (state) => state.adminProducts.items;
export const selectAdminProductRows = (state) => state.adminProducts.items.map(mapProductToRow);
export const selectAdminProductsStatus = (state) => state.adminProducts.status;
export const selectAdminProductsError = (state) => state.adminProducts.error;
export const selectAdminProductsFilters = (state) => state.adminProducts.filters;
export const selectAdminProductsMutationStatus = (state) => state.adminProducts.mutationStatus;
export const selectAdminProductsMutationError = (state) => state.adminProducts.mutationError;

export default adminProductsSlice.reducer;
