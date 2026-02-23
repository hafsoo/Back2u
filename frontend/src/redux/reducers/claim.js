// src/redux/reducers/claimReducer.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = { loading: false, claims: [], error: null };

export const claimReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("myClaimsRequest", (state) => { state.loading = true; })
    .addCase("myClaimsSuccess", (state, action) => { state.loading = false; state.claims = action.payload; })
    .addCase("myClaimsFail", (state, action) => { state.loading = false; state.error = action.payload; })
    .addCase("clearClaimErrors", (state) => { state.error = null; });
});
