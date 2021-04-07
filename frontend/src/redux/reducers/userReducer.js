import {
  CLEAR_USER_ERROR,
  LOADING_USER_UI,
  SET_USER_ERROR,
  USER_SIGNUP_SUCCESS,
  SET_USER,
  LOGOUT_USER,
  ADD_CART_SUCCESS,
  ADD_CART_FAIL,
  SET_CART,
  SET_ORDERS,
  RESET_PASS_SUCCESS,
  SET_PAYTM_PARAMS,
  PAYTM_ERROR,
  CHANGE_PAYMENT_SUCCESS,
} from "../types";

const initialState = {
  userId: "",
  firstname: "",
  lastname: "",
  email: "",
  address: "",
  state: "",
  city: "",
  cart: [],
  price: "",
  orders: [],

  addCartSuccess: false,
  addCartFail: false,
  deleteCartSuccess: false,
  loading: false,
  error: "",
  userLogin: false,
  resetPassStatus: "",
  newPassStatus: "",
  paytm_params: "",
  paytm_error: "",
  isTransactionSuccess: false,
};

export const userReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        error: "",
      };
    }
    case SET_USER: {
      return {
        ...action.payload,
        userId: action.payload._id,
        loading: false,
        error: "",
        userLogin: true,
      };
    }
    case LOGOUT_USER: {
      return initialState;
    }
    case ADD_CART_SUCCESS: {
      return {
        ...state,
        addCartSuccess: true,
        addCartFail: false,
      };
    }
    case ADD_CART_FAIL: {
      return {
        ...state,
        addCartSuccess: false,
        addCartFail: true,
      };
    }
    case SET_CART: {
      return {
        ...state,
        loading: false,
        cart: action.payload.cart,
        price: action.payload.totalPrice,
      };
    }
    case SET_ORDERS: {
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    }
    case RESET_PASS_SUCCESS: {
      return {
        ...state,
        resetPassStatus: action.payload,
      };
    }
    case SET_PAYTM_PARAMS: {
      return {
        ...state,
        paytm_params: action.payload,
        isTransactionSuccess: true,
      };
    }
    case PAYTM_ERROR: {
      return {
        ...state,
        paytm_error: action.payload,
        isTransactionSuccess: false,
      };
    }
    case CHANGE_PAYMENT_SUCCESS: {
      return {
        ...state,
        isTransactionSuccess: false,
      };
    }

    //common cases
    case LOADING_USER_UI: {
      return {
        ...state,
        loading: true,
        userLogin: false,
        error: "",
      };
    }
    case SET_USER_ERROR: {
      return {
        ...state,
        loading: false,
        userLogin: false,
        error: action.payload.error,
      };
    }
    case CLEAR_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: "",
      };
    }
    default: {
      return state;
    }
  }
};
