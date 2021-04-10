import axios from "axios";
import {
  ADD_ITEM,
  CLEAR_SELLER_ERROR,
  DELETE_ITEM,
  EDIT_ITEM,
  LOADING_SELLER_UI,
  LOGOUT_SELLER,
  RESET_SELLER_PASS_ERROR,
  RESET_SELLER_PASS_SUCCESS,
  SELLER_SIGNUP_SUCCESS,
  SET_ORDERS,
  SET_RESTAURANT,
  SET_RESTAURANTS,
  SET_RESTAURANT_USER,
  SET_SELLER_ERROR,
} from "../types";

export const fetchRestaurants = () => (dispach) => {
  dispach({ type: LOADING_SELLER_UI });
  dispach({ type: CLEAR_SELLER_ERROR });

  axios
    .get("/restaurants")
    .then((res) => {
      dispach({
        type: SET_RESTAURANTS,
        payload: res.data,
      });
      dispach({ type: CLEAR_SELLER_ERROR });
    })
    .catch((error) => {
      console.log(error);
      dispach({
        type: SET_RESTAURANTS,
        payload: [],
      });
    });
};

export const fetchRestaurant = (restId) => (dispatch) => {
  dispatch({ type: LOADING_SELLER_UI });

  axios
    .get(`/restaurant/${restId}`)
    .then((res) => {
      dispatch({
        type: SET_RESTAURANT_USER,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch({
        type: SET_RESTAURANT_USER,
        payload: {},
      });
    });
};

export const fetchRestaurantSeller = (restId) => (dispatch) => {
  dispatch({ type: LOADING_SELLER_UI });

  axios
    .get(`/restaurant/${restId}`)
    .then((res) => {
      dispatch({
        type: SET_RESTAURANT,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch({
        type: SET_RESTAURANT,
        payload: {},
      });
    });
};

export const signupSeller = (newSellerData, history) => (dispatch) => {
  dispatch({ type: CLEAR_SELLER_ERROR });
  dispatch({ type: LOADING_SELLER_UI });

  axios
    .post("/sellerSignup", newSellerData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch({
        type: SELLER_SIGNUP_SUCCESS,
      });
      dispatch({ type: CLEAR_SELLER_ERROR });
      history.push("/sellerSignin");
    })
    .catch((error) => {
      dispatch({
        type: SET_SELLER_ERROR,
        payload: error.response.data,
      });
    });
};

export const signinSeller = (sellerData, history) => (dispatch) => {
  dispatch({ type: LOADING_SELLER_UI });
  dispatch({ type: CLEAR_SELLER_ERROR });

  axios
    .post("/sellerSignin", sellerData)
    .then((res) => {
      dispatch({
        type: SET_RESTAURANT,
        payload: res.data,
      });
      dispatch({ type: CLEAR_SELLER_ERROR });

      history.push("/seller/dashboard");
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: SET_RESTAURANT,
          payload: [],
        });
        dispatch({
          type: SET_SELLER_ERROR,
          payload: error.response.data.error,
        });
      }
    });
};

export const addItem = (itemData, restId) => (dispatch) => {
  dispatch({ type: LOADING_SELLER_UI });
  dispatch({ type: CLEAR_SELLER_ERROR });

  axios
    .post(`/create-item/${restId}`, itemData)
    .then((res) => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data.item,
      });
      dispatch({ type: CLEAR_SELLER_ERROR });
    })
    .catch((error) => {
      console.log("=============");
      alert(error.response.data.error);
      console.log("error...", error.response);
      if (error.response) {
        console.log("yes it comes...");
        dispatch({
          type: SET_SELLER_ERROR,
          payload: error.response.data.error,
        });
      }
    });
};

export const editItem = (itemData, itemId) => (dispatch) => {
  dispatch({ type: CLEAR_SELLER_ERROR });

  axios
    .put(`/edit-item/${itemId}`, itemData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch({
        type: EDIT_ITEM,
        payload: res.data.item,
      });
      dispatch({ type: CLEAR_SELLER_ERROR });
      console.log("editItem res Action...", res);
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: SET_SELLER_ERROR,
          payload: error.response.data.error,
        });
      }
    });
};

export const deleteItem = (itemId) => (dispatch) => {
  dispatch({ type: CLEAR_SELLER_ERROR });

  axios
    .delete(`/delete-item/${itemId}`)
    .then((res) => {
      dispatch({
        type: DELETE_ITEM,
        payload: itemId, //passed itemId as payload, so we can update state
      });
      dispatch({ type: CLEAR_SELLER_ERROR });
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        dispatch({
          type: SET_SELLER_ERROR,
          payload: error.response.data.error,
        });
      }
    });
};

export const getOrdersForSeller = (selId) => (dispach) => {
  dispach({ type: LOADING_SELLER_UI });

  axios
    .get(`/seller-orders/${selId}`)
    .then((res) => {
      dispach({
        type: SET_ORDERS,
        payload: res.data.userOrders,
      });
    })
    .catch((error) => {
      if (error.response) {
        dispach({
          type: SET_SELLER_ERROR,
          payload: error.response.data.error,
        });
      }
    });
};

export const logoutSeller = (history) => (dispatch) => {
  dispatch({ type: LOGOUT_SELLER });
  history.push("/");
};

export const resetSellerPassword = (email) => (dispatch) => {
  dispatch({ type: CLEAR_SELLER_ERROR });
  axios
    .post("/reset-seller-password", { email })
    .then((res) => {
      dispatch({
        type: RESET_SELLER_PASS_SUCCESS,
        payload: res.data.msg,
      });
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response) {
        dispatch({
          type: RESET_SELLER_PASS_ERROR,
          payload: error.response.data.error,
        });
      }
    });
};

export const newSellerPassword = (newPassword, token) => (dispatch) => {
  console.log("token...", token);
  axios
    .post("/new-seller-password", { newPassword, token })
    .then((res) => {})
    .catch((error) => {
      console.log(error.response);
      if (error.response) {
        dispatch({
          type: SET_SELLER_ERROR,
          payload: error.response.data,
        });
      }
    });
};
