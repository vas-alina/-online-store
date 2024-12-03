import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { thunk } from "redux-thunk";
import {
  appReducer,
  userReducer,
  usersReducer,
  productReducer,
  productsReducer,
  orderReducer,
  ordersReducer,
  cartReducer,
  favoritesReducer

} from "./reducers";

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
  users: usersReducer,
  product: productReducer,
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
  orders: ordersReducer,
  favorite: favoritesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
