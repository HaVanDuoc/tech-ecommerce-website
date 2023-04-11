export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const FetchProducts = (
  state = { isFetch: false, products: null },
  action
) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        isFetch: true,
        products: action.payload,
      };

    default:
      return state;
  }
};

export const selectorFetchProducts = (state) =>
  state.HomeFetchProducts;
