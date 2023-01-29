import { SET_OPEN } from "./ModalAuthConstant";

export const setOpen = (open) => ({
  type: SET_OPEN,
  payload: open,
});
