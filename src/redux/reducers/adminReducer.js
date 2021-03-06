import {
  CLEAR_ADMIN_ERROR,
  DELETE_REST_FAIL,
  DELETE_REST_SUCCESS,
  LOADING_ADMIN_UI,
  LOGOUT_ADMIN,
  SET_ADMIN,
  SET_ADMIN_ERROR,
  SET_ALL_RESTAURANTS,
} from "../types";

const initialState = {
  allRestaurants: [],
  deleteSuccess: false,
  error: "",
  loading: false,
  adminLogin: false,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN: {
      return {
        ...state,
        adminLogin: true,
      };
    }
    case SET_ALL_RESTAURANTS: {
      return {
        ...state,
        allRestaurants: action.payload,
        loading: false,
      };
    }
    case SET_ADMIN_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case DELETE_REST_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        allRestaurants: state.allRestaurants.filter((rest) => rest._id !== action.payload),
      };
    }
    case LOGOUT_ADMIN: {
      return initialState;
    }
    case DELETE_REST_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case CLEAR_ADMIN_ERROR: {
      return {
        ...state,
        deleteSuccess: false,
        error: "",
      };
    }
    case LOADING_ADMIN_UI: {
      return {
        ...state,
        loading: true,
      };
    }
    default: {
      return state;
    }
  }
};
