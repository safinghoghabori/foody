import axios from "axios";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  CLEAR_USER_ERROR,
  LOADING_USER_UI,
  USER_SIGNUP_SUCCESS,
  SET_USER_ERROR,
  SET_USER,
  LOGOUT_USER,
  ADD_CART_SUCCESS,
  ADD_CART_FAIL,
  SET_CART,
  SET_ORDERS,
  RESET_PASS_SUCCESS,
  ADD_NEW_PASS_SUCCESS,
  PAYTM_ERROR,
  SET_PAYTM_PARAMS,
  CHANGE_PAYMENT_SUCCESS,
  RESET_USER_PASS_ERROR,
} from "../types";

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_USER_UI });
  dispatch({ type: CLEAR_USER_ERROR });

  axios
    .post("/signup", newUserData)
    .then((res) => {
      console.log("user res...", res);
      dispatch({
        type: USER_SIGNUP_SUCCESS,
      });
      dispatch({ type: CLEAR_USER_ERROR });
      history.push("/userSignin");
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response) {
        dispatch({
          type: SET_USER_ERROR,
          payload: error.response.data,
        });
      }
    });
};

export const signinUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_USER_UI });
  dispatch({ type: CLEAR_USER_ERROR });

  axios
    .post("/signin", userData)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      history.push("/");
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response) {
        dispatch({
          type: SET_USER_ERROR,
          payload: error.response.data,
        });
        toast.error(`${error.response.data.error}`, { position: "bottom-right" });
      }
    });
};

export const logoutUser = (history) => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  history.push("/");
};

export const addToCart = (userId, itemId) => (dispatch) => {
  const itemQty = 1;
  axios
    .post(`/add-to-cart/${userId}`, { itemId, itemQty })
    .then((res) => {
      dispatch({
        type: ADD_CART_SUCCESS,
      });
      dispatch(getCart(userId));
    })
    .catch((error) => {
      dispatch({
        type: ADD_CART_FAIL,
        payload: error.response.data,
      });
    });
};

export const getCart = (userId) => (dispatch) => {
  console.log("userId...", userId);
  axios
    .get(`/get-cart-items/${userId}`)
    .then((res) => {
      dispatch({
        type: SET_CART,
        payload: res.data,
      });
      console.log("res.data...", res.data);
    })
    .catch((error) => {
      dispatch({
        type: SET_CART,
        payload: [],
      });
    });
};

export const reduceCartItem = (userId, itemId) => (dispatch) => {
  axios
    .post(`/reduce-cart-item/${userId}`, { itemId })
    .then((res) => {
      console.log(res.data);
      dispatch(getCart(userId));
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const deleteCartItem = (userId, itemId) => (dispatch) => {
  axios
    .post(`/delete-cart-item/${userId}`, { itemId })
    .then((res) => {
      console.log(res.data);
      dispatch(getCart(userId));
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const addDeliveryAddress = (deliveryAddress, userId, history) => (dispatch) => {
  axios
    .post(`/add-delivery-address/${userId}`, deliveryAddress)
    .then((res) => {
      dispatch(placeOrder(userId, history));
    })
    .catch((error) => {
      dispatch({
        type: SET_USER_ERROR,
        payload: error.response.data,
      });
    });
};

export const placeOrder = (userId, history) => (dispatch) => {
  axios
    .post(`/order/${userId}`)
    .then((res) => {
      dispatch(getOrders(userId));
      // history.push("/orders");
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const getOrders = (userId) => (dispatch) => {
  axios
    .get(`/user-orders/${userId}`)
    .then((res) => {
      dispatch({
        type: SET_ORDERS,
        payload: res.data.userOrders,
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const resetUserPassword = (email, history) => (dispatch) => {
  dispatch({ type: CLEAR_USER_ERROR });
  axios
    .post("/reset-user-password", { email })
    .then((res) => {
      dispatch({
        type: RESET_PASS_SUCCESS,
        payload: res.data.msg,
      });
      toast.info(`Please check your email to reset password`, { position: "bottom-right" });
      setTimeout(() => {
        history.push("/");
      }, 3000);
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response) {
        dispatch({
          type: RESET_USER_PASS_ERROR,
          payload: error.response.data.error,
        });
        toast.error(`${error.response.data.error}`, { position: "bottom-right" });
      }
    });
};

export const newUserPassword = (newPassword, token) => (dispatch) => {
  console.log("token...", token);
  axios
    .post("/new-user-password", { newPassword, token })
    .then((res) => {
      dispatch({
        type: ADD_NEW_PASS_SUCCESS,
        payload: res.data.msg,
      });
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response) {
        dispatch({
          type: SET_USER_ERROR,
          payload: error.response.data,
        });
      }
    });
};

export const makePayment = (name, email, amount, phone) => (dispatch) => {
  axios
    .post("/paynow", { name, email, amount, phone })
    .then((res) => {
      dispatch({
        type: SET_PAYTM_PARAMS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        dispatch({
          type: PAYTM_ERROR,
          payload: error.response.data.error,
        });
      }
    });
};
