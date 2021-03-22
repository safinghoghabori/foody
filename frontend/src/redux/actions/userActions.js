import axios from "axios";
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
} from "../types";

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_USER_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      console.log("user res...", res);
      dispatch({
        type: USER_SIGNUP_SUCCESS,
      });
      dispatch({ type: CLEAR_USER_ERROR });
      history.push("/userLogin");
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
      dispatch({ type: CLEAR_USER_ERROR });
      history.push("/");
    })
    .catch((error) => {
      console.log("its in error");
      console.log(error.response.data);
      if (error.response) {
        dispatch({
          type: SET_USER_ERROR,
          payload: error.response.data,
        });
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
      history.push("/orders");
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