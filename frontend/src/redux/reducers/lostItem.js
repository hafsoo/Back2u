import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  lostItems: [],
  message: null,
   possibleMatches: [], // <--- store matches
};

export const lostItemReducer = createReducer(initialState, (builder) => {
  builder
    // 🟢 Create Lost Item
    .addCase("lostItemCreateRequest", (state) => {
      state.isLoading = true;
       state.error = null;//1
      state.success = false;//2
      state.possibleMatches = [];//3
    })
    .addCase("lostItemCreateSuccess", (state, action) => {
      state.isLoading = false;
      //state.lostItems.push(action.payload);
       state.lostItems.push(action.payload.lostItem); // store the created item
      state.possibleMatches = action.payload.possibleMatches || []; // store matches
      state.success = true;
    })
    .addCase("lostItemCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.possibleMatches = [];//4
    })

    // 🟡 Get All Lost Items
    .addCase("getAllLostItemsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllLostItemsSuccess", (state, action) => {
      state.isLoading = false;
      state.lostItems = action.payload;
    })
    .addCase("getAllLostItemsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // 🔵 Delete Lost Item
    .addCase("deleteLostItemRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteLostItemSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.lostItems = state.lostItems.filter(
        (item) => item._id !== action.payload._id
      );
    })
    .addCase("deleteLostItemFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // 🔴 Admin: Get All Lost Items
    .addCase("adminGetAllLostItemsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("adminGetAllLostItemsSuccess", (state, action) => {
      state.isLoading = false;
      state.lostItems = action.payload;
    })
    .addCase("adminGetAllLostItemsFail", (state, action) => {
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
