import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  foundItems: [],
  message: null,
   possibleMatches: [], // <--- store matches
};

export const foundItemReducer = createReducer(initialState, (builder) => {
  builder
    // 🟢 Create Found Item
    .addCase("foundItemCreateRequest", (state) => {
      state.isLoading = true;
      state.error = null;//1
      state.success = false;//2
      state.possibleMatches = []; // reset matches
    })
    .addCase("foundItemCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.foundItems.push(action.payload.foundItem); // store created item
      state.possibleMatches = action.payload.possibleMatches || []; // store matches
      //state.foundItems.push(action.payload);
      state.success = true;
    })
    .addCase("foundItemCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
          state.possibleMatches = []; // reset matches
    })

    // 🟡 Get All Found Items
    .addCase("getAllFoundItemsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllFoundItemsSuccess", (state, action) => {
      state.isLoading = false;
      state.foundItems = action.payload;
    })
    .addCase("getAllFoundItemsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // 🔵 Delete Found Item
    .addCase("deleteFoundItemRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteFoundItemSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.foundItems = state.foundItems.filter(
        (item) => item._id !== action.payload._id
      );
    })
    .addCase("deleteFoundItemFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // 🔴 Admin: Get All Found Items
    .addCase("adminGetAllFoundItemsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("adminGetAllFoundItemsSuccess", (state, action) => {
      state.isLoading = false;
      state.foundItems = action.payload;
    })
    .addCase("adminGetAllFoundItemsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Clear errors and messages
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
    })
    .addCase("clearPossibleMatches", (state) => {
  state.possibleMatches = [];
});

});
