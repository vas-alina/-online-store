import { ACTION_TYPE } from "../action";

const initialProductState = {
  id: '',
  title: '',
  img_url: '',
  category: '',
  price: 0,
  color: '',
  form: '',
  width: 0,
  height: 0,
  length: 0,
  desc: '',
  createdAt: '',
  comments: [],
};
export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload, 
      };
    case ACTION_TYPE.ADD_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments,
          action.payload
        ],
      }
    case ACTION_TYPE.REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload),
      }
    case ACTION_TYPE.SET_PRODUCT_DATA:
      return {
        ...state,
        ...action.payload,
      }

    case ACTION_TYPE.RESET_PRODUCT_DATA:
      return initialProductState;

    default:
      return state;
  }
};