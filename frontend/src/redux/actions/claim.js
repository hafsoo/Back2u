// src/redux/actions/claimActions.js
import axios from "axios";
import { server } from "../../server";

export const getMyClaims = () => async (dispatch) => {
  try {
    dispatch({ type: "myClaimsRequest" });
    const { data } = await axios.get(`${server}/claim/my-claims`, { withCredentials: true });
    dispatch({ type: "myClaimsSuccess", payload: data.claims });
  } catch (err) {
    dispatch({ type: "myClaimsFail", payload: err.response?.data?.message || err.message });
  }
};
