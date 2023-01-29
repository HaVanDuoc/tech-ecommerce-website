import { SET_OPEN } from "./ModalAuthConstant";

const MODAL_AUTH_INIT_STATE = {
  open: false,
};

const ModalAuthReducer = (state = MODAL_AUTH_INIT_STATE, action) => {
  switch (action.type) {
    case SET_OPEN:
      return {
        open: action.payload,
      };

    default:
      return state;
  }
};

export default ModalAuthReducer;

export const selectorModalAuthOpen = (state) => state.ModalAuth.open;
