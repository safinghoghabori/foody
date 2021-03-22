import {
  ADD_ITEM,
  CLEAR_SELLER_ERROR,
  DELETE_ITEM,
  EDIT_ITEM,
  LOADING_SELLER_UI,
  LOGOUT_SELLER,
  SELLER_SIGNUP_SUCCESS,
  SET_RESTAURANT,
  SET_RESTAURANTS,
  SET_RESTAURANT_USER,
  SET_SELLER_ERROR,
} from "../types";

const initialState = {
  restaurants: [],
  restaurant: {},
  restaurantUser: {}, //restaurant to show user
  items: [],

  selId: "",
  restaurantname: "",
  email: "",
  address: "",
  state: "",
  city: "",
  image: "",
  tags: "",
  phoneno: "",

  loading: false,
  sellerLogin: false,
  error: "",
};

export const sellerReducer = (state = initialState, action) => {
  console.log("action...", action.payload);
  console.log("sellerReducer items state ...", state.items);
  switch (action.type) {
    case SET_RESTAURANTS: {
      return {
        ...state,
        restaurants: action.payload,
        loading: false,
      };
    }
    case SET_RESTAURANT_USER: {
      return {
        ...state,
        restaurantUser: action.payload,
        loading: false,
      };
    }
    case SET_RESTAURANT: {
      return {
        ...state,
        ...action.payload,
        restaurant: action.payload,
        sellerLogin: true,
        items: action.payload.items,
        loading: false,
        selId: action.payload._id,
        error: "",
      };
    }
    case SELLER_SIGNUP_SUCCESS: {
      return {
        ...state,
      };
    }
    case ADD_ITEM: {
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    }
    case EDIT_ITEM: {
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? { ...action.payload } : item
        ),
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    }
    case LOGOUT_SELLER: {
      return {
        ...state,
        restaurant: {},
        loading: false,
        sellerLogin: false,
        error: "",
      };
    }

    //common cases
    case LOADING_SELLER_UI: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_SELLER_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    case CLEAR_SELLER_ERROR: {
      return {
        ...state,
        error: "",
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};