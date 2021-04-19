import {
  CLEAR_ADMIN_ERROR,
  DELETE_REST_FAIL,
  DELETE_REST_SUCCESS,
  LOADING_ADMIN_UI,
  SET_ALL_RESTAURANTS,
} from "../types";

import axios from "axios";

export const getAllRestaurants = () => (dispatch) => {
  dispatch({ type: LOADING_ADMIN_UI });
  axios
    .get("/get-all-restaurants")
    .then((res) => {
      dispatch({
        type: SET_ALL_RESTAURANTS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log("admin error..", error);
      dispatch({
        type: SET_ALL_RESTAURANTS,
        payload: [],
      });
    });
};

export const deleteRestaurant = (id) => (dispatch) => {
  dispatch({ type: CLEAR_ADMIN_ERROR });

  axios
    .delete(`/delete-restaurant/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_REST_SUCCESS,
        payload: id,
      });
      // dispatch({
      //   type: DELETE_SELLER_REST,
      //   payload: id,
      // });
    })
    .catch((error) => {
      console.log(error.response);
      dispatch({
        type: DELETE_REST_FAIL,
        payload: error.response.data.error,
      });
    });
};
