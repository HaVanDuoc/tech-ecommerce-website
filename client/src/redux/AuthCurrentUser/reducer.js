import { CURRENT_USER } from "./constant";

const INIT_STATE = {
  isLogged: false,
  user: null,
};

const CurrentUserReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        isLogged: true,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default CurrentUserReducer;

export const selectorCurrentUser = (state) => state.CurrentUser;
