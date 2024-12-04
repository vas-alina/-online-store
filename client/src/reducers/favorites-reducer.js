import { ACTION_TYPE } from "../action";

const initialState = {
    favorites: []
};

export const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_FAVORITES:
            console.log('В редьюсере SET_FAVORITES, payload.items:', action.payload.items);
            return {
                ...state,
                favorites: action.payload.items || [],
            }
        case ACTION_TYPE.ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        case ACTION_TYPE.REMOVE_FROM_FAVORITES:
            return {
                ...state,
                favorites: state.favorites.filter(item => item.id !== action.payload),
            }
        case ACTION_TYPE.CLEAR_FAVORITES:
            return {
                ...state,
                favorites: [],
            }
        default:
            return state;
    }
};