import { configureStore } from "@reduxjs/toolkit";
import adminProductsReducer from "./Slices/adminProductsSlice";
import adminOrdersReducer from "./Slices/adminOrdersSlice";
import adminCollectionsReducer from "./Slices/adminCollectionsSlice";

export const store = configureStore({
  reducer:{
    adminProducts: adminProductsReducer,
    adminOrders: adminOrdersReducer,
    adminCollections: adminCollectionsReducer,
  }
});