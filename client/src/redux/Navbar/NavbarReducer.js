import { GET_INDEX } from "./NavbarConstant";

const NAVBAR_INIT_STATE = {
  index: null,
};

const NavbarReducer = (state = NAVBAR_INIT_STATE, action) => {
  switch (action.type) {
    case GET_INDEX:
      return {
        index: action.payload,
      };

    default:
      return state;
  }
};

export default NavbarReducer;

export const selectedIndexNavbar = (state) => state.Navbar.index;
