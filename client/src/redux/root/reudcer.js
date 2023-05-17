import { GET_CART } from "./constants";

const INIT_STATE = {
  currentPage: {
    path: null,
    name: null,
  },
};

export const CartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        isFetch: true,
        payload: action.payload,
      };

    default:
      return state;
  }
};

export const selectorCart = (state) => state.Cart;
