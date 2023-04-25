import { GET_CART } from "./constants";

export const GetCart = (cart) => {
  return {
    type: GET_CART,
    payload: cart,
  };
};
