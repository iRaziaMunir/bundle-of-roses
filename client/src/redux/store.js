import { configureStore } from "@reduxjs/toolkit";
import adminProductsReducer from "./slices/adminProductsSlice";
import adminOrdersReducer from "./slices/adminOrdersSlice";
import adminCollectionsReducer from "./slices/adminCollectionsSlice";
import lovedProductsReducer from "./slices/products/lovedProductsSlice";
import homeCollectionSectionsReducer from "./slices/products/homeCollectionSectionsSlice";
import productDetailReducer from "./slices/productDetailSlice";
import collectionPageReducer from "./slices/collectionPageSlice";
import collectionsBrowseReducer from "./slices/collectionsBrowseSlice";

export const store = configureStore({
  reducer:{
    adminProducts: adminProductsReducer,
    adminOrders: adminOrdersReducer,
    adminCollections: adminCollectionsReducer,
    lovedProducts: lovedProductsReducer,
    homeCollectionSections: homeCollectionSectionsReducer,
    productDetail: productDetailReducer,
    collectionPage: collectionPageReducer,
    collectionsBrowse: collectionsBrowseReducer,
  }
});