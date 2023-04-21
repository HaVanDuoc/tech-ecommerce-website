import { RECENT } from "./constant";

const INIT_STATE = {
  isPending: false,
  recent: null,
};

export const Search = (state = INIT_STATE, action) => {
  switch (action.type) {
    case RECENT:
      return {
        isPending: true,
        recent: action.payload,
      };

    default:
      return state;
  }
};

export const selectorSearch = (state) => state.Search;
