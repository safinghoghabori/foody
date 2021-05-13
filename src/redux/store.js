import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { userReducer } from "./reducers/userReducer";
import { sellerReducer } from "./reducers/sellerReducer";
import { adminReducer } from "./reducers/adminReducer";

//store state in localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // return undefined
    console.log(e);
  }
};
const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  user: userReducer,
  seller: sellerReducer,
  admin: adminReducer,
});

const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));

//store state in localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
