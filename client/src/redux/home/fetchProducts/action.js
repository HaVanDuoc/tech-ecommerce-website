import { FETCH_PRODUCTS } from "./reducer";

export const FetchProducts = (products) => {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
};
