import { ACTION_TYPE } from "../action";

const initialAppState = {
  wasLogout: false,
  modal: {
    isOpen: false,
    text: '',
    onConfirm: () => { },
    onCancel: () => { },
  }
};
//TODO:
export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGOUT:
      return {
        ...state,
        // wasLogout: !state.wasLogout,
        wasLogout: true,
      };
    case ACTION_TYPE.OPEN_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.payload,
          isOpen: true,
        },

      };
    case ACTION_TYPE.CLOSE_MODAL:
      return initialAppState;

    default:
      return state;
  }
};