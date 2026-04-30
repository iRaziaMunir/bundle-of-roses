import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAdminCollection, fetchAdminCollections, updateAdminCollection } from "../../api/adminCollectionsApi";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  mutationStatus: "idle",
  mutationError: null,
};

export const loadAdminCollections = createAsyncThunk("adminCollections/load", async (_, { rejectWithValue }) => {
  try {
    return await fetchAdminCollections();
  } catch (error) {
    return rejectWithValue(error.message || "Unable to load collections");
  }
});

export const createAdminCollectionThunk = createAsyncThunk(
  "adminCollections/create",
  async (payload, { rejectWithValue }) => {
    try {
      return await createAdminCollection(payload);
    } catch (error) {
      return rejectWithValue(error.message || "Unable to create collection");
    }
  }
);

export const updateAdminCollectionThunk = createAsyncThunk(
  "adminCollections/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateAdminCollection(id, payload);
    } catch (error) {
      return rejectWithValue(error.message || "Unable to update collection");
    }
  }
);

export const hideAdminCollectionThunk = createAsyncThunk(
  "adminCollections/hide",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await updateAdminCollection(id, { status: "hidden" });
    } catch (error) {
      return rejectWithValue(error.message || "Unable to hide collection");
    }
  }
);

const adminCollectionsSlice = createSlice({
  name: "adminCollections",
  initialState,
  reducers: {
    clearAdminCollectionsError(state) {
      state.error = null;
    },
    resetMutationState(state) {
      state.mutationStatus = "idle";
      state.mutationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAdminCollections.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadAdminCollections.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(loadAdminCollections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unable to load collections";
      })
      // create
      .addCase(createAdminCollectionThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(createAdminCollectionThunk.fulfilled, (state) => {
        state.mutationStatus = "succeeded";
      })
      .addCase(createAdminCollectionThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload || "Unable to create collection";
      })
      // update
      .addCase(updateAdminCollectionThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(updateAdminCollectionThunk.fulfilled, (state) => {
        state.mutationStatus = "succeeded";
      })
      .addCase(updateAdminCollectionThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload || "Unable to update collection";
      })
      // hide
      .addCase(hideAdminCollectionThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(hideAdminCollectionThunk.fulfilled, (state) => {
        state.mutationStatus = "succeeded";
      })
      .addCase(hideAdminCollectionThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload || "Unable to hide collection";
      });
  },
});

export const { clearAdminCollectionsError, resetMutationState } = adminCollectionsSlice.actions;

export const selectAdminCollectionsState = (state) => state.adminCollections;
export const selectAdminCollectionsItems = (state) => state.adminCollections.items;
export const selectAdminCollectionsStatus = (state) => state.adminCollections.status;
export const selectAdminCollectionsError = (state) => state.adminCollections.error;
export const selectAdminCollectionsMutationStatus = (state) => state.adminCollections.mutationStatus;
export const selectAdminCollectionsMutationError = (state) => state.adminCollections.mutationError;

export default adminCollectionsSlice.reducer;

