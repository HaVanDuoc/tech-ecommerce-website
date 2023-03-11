const { OPEN, CLOSE } = require("./constant");

const INIT_STATE = {
  open: null,
};

const Reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case OPEN:
      return {
        open: true,
      };

    case CLOSE:
      return {
        open: false,
      };

    default:
      return state;
  }
};

export default Reducer;

export const selectorOpen = (state) =>
  state.ButtonEditPageUpdateProductInAdmin.open;
