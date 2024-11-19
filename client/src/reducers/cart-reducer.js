import { ACTION_TYPE } from "../action";

const initialState = {

  items: []

};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_CART:
      return {
        ...state,
        items: action.payload.items || [],
      };
    case ACTION_TYPE.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case ACTION_TYPE.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      }
    case ACTION_TYPE.REMOVE_ALL_FROM_CART:
      return {
        ...state,
        items: [],
      }
    default:
      return state;
  }
};