import { ACTION_TYPE } from "../action";

const initialState = {
    items: []
};

export const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_FAVORITES:
            return {
                ...state,
                items: action.payload.items || [],
            };
        case ACTION_TYPE.ADD_TO_FAVORITES:
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case ACTION_TYPE.REMOVE_FROM_FAVORITES:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            }
        case ACTION_TYPE.CLEAR_FAVORITES:
            return {
                ...state,
                items: [],
            }
        default:
            return state;
    }
};