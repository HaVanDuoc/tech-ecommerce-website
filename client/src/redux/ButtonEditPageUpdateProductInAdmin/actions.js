import { CLOSE, OPEN } from "./constant";

export const open = () => ({
  type: OPEN,
});

export const close = () => ({
  type: CLOSE,
});
