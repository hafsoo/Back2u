import axios from "axios";
import { server } from "../../server";

// 🟢 Create Lost Item
export const createLostItem = (lostItemData) => async (dispatch) => {
  try {
    dispatch({ type: "lostItemCreateRequest" });

    const { data } = await axios.post(
      `${server}/lost/report-lost-item`,
      lostItemData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    dispatch({
      type: "lostItemCreateSuccess",
      payload: {
        lostItem: data.lostItem,
        possibleMatches: data.possibleMatches, // <--- new
      },
      //payload: data.lostItem,
    });
  } catch (error) {
    dispatch({
      type: "lostItemCreateFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🟡 Get All Lost Items
export const getAllLostItems = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllLostItemsRequest" });

    const { data } = await axios.get(`${server}/lost/get-all-lost-items`);
    dispatch({
      type: "getAllLostItemsSuccess",
      payload: data.lostItems,
    });
  } catch (error) {
    dispatch({
      type: "getAllLostItemsFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🔵 Delete Lost Item
export const deleteLostItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteLostItemRequest" });

    const { data } = await axios.delete(
      `${server}/lost/delete-lost-item/${id}`,
      {
        withCredentials: true,
      },
    );

    dispatch({
      type: "deleteLostItemSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteLostItemFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🔴 Admin: Get All Lost Items
export const adminGetAllLostItems = () => async (dispatch) => {
  try {
    dispatch({ type: "adminGetAllLostItemsRequest" });

    const { data } = await axios.get(`${server}/lost/admin-all-lost-items`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminGetAllLostItemsSuccess",
      payload: data.lostItems,
    });
  } catch (error) {
    dispatch({
      type: "adminGetAllLostItemsFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};


// Clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: "clearErrors" });
};

// Clear messages and matches
export const clearMessage = () => (dispatch) => {
  dispatch({ type: "clearMessage" });
  dispatch({ type: "clearPossibleMatches" });
};

