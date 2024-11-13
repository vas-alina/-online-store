import { ACTION_TYPE } from "../action";
import { ROLE } from "../constans";

const initialOrderState = {
productId: null,
count: null,
  roleId: ROLE.GUEST,
  id: null,
};

export const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_ORDER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPE.LOGOUT:
      return initialOrderState;
    default:
      return state;
  }
};