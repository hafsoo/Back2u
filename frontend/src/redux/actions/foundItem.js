import axios from "axios";
import { server } from "../../server";

// 🟢 Create Found Item
export const createFoundItem = (foundItemData) => async (dispatch) => {
  try {
    dispatch({ type: "foundItemCreateRequest" });

    const { data } = await axios.post(
      `${server}/found/report-found-item`,
      foundItemData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    dispatch({
      type: "foundItemCreateSuccess",
      payload: {
        lostItem: data.foundItem,
        possibleMatches: data.possibleMatches, // <--- new
      },
      // payload: data.foundItem,
    });
  } catch (error) {
    dispatch({
      type: "foundItemCreateFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🟡 Get All Found Items
export const getAllFoundItems = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllFoundItemsRequest" });

    const { data } = await axios.get(`${server}/found/get-all-found-items`);
    dispatch({
      type: "getAllFoundItemsSuccess",
      payload: data.foundItems,
    });
  } catch (error) {
    dispatch({
      type: "getAllFoundItemsFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🔵 Delete Found Item
export const deleteFoundItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteFoundItemRequest" });

    const { data } = await axios.delete(
      `${server}/found/delete-found-item/${id}`,
      {
        withCredentials: true,
      },
    );

    dispatch({
      type: "deleteFoundItemSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteFoundItemFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🔴 Admin: Get All Found Items
export const adminGetAllFoundItems = () => async (dispatch) => {
  try {
    dispatch({ type: "adminGetAllFoundItemsRequest" });

    const { data } = await axios.get(`${server}/found/admin-all-found-items`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminGetAllFoundItemsSuccess",
      payload: data.foundItems,
    });
  } catch (error) {
    dispatch({
      type: "adminGetAllFoundItemsFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};


///Clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: "clearErrors" });
};

// Clear messages and matches
export const clearMessage = () => (dispatch) => {
  dispatch({ type: "clearMessage" });
  dispatch({ type: "clearPossibleMatches" });
};
