import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAdminOrders } from "../../api/adminOrdersApi";

const initialState = {
  items: [],
  status: "idle",
  error: null,
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

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function toTitleCase(value = "") {
  return value
    .split("_")
    .join(" ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function mapOrderToRow(order) {
  const orderStatus = order?.status?.orderStatus || "pending";
  const fulfillmentStatus = order?.status?.fulfillmentStatus || "unfulfilled";

  return {
    id: order.orderNumber || order._id,
    customer: order.email || "Guest customer",
    date: formatDate(order.createdAt),
    total: formatCurrency(order?.pricing?.grandTotal),
    payment: toTitleCase(orderStatus),
    fulfillment: toTitleCase(fulfillmentStatus),
  };
}

export const loadAdminOrders = createAsyncThunk(
  "adminOrders/loadAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAdminOrders();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Unable to load admin orders");
    }
  }
);

const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAdminOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadAdminOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(loadAdminOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unable to load admin orders";
      });
  },
});

export const selectAdminOrdersState = (state) => state.adminOrders;
export const selectAdminOrderRows = (state) => state.adminOrders.items.map(mapOrderToRow);
export const selectAdminOrdersStatus = (state) => state.adminOrders.status;
export const selectAdminOrdersError = (state) => state.adminOrders.error;

export default adminOrdersSlice.reducer;

