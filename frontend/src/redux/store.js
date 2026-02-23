import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { lostItemReducer } from "./reducers/lostItem";
import { foundItemReducer } from "./reducers/foundItem";
import { claimReducer } from "./reducers/claim";

const Store = configureStore({
  reducer: {
    user: userReducer,
    lostItem:lostItemReducer,
    foundItem:foundItemReducer,
    claims:claimReducer

  },
});
export default Store;
