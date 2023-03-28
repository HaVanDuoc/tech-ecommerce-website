import { CURRENT_USER } from "./constant";

export const CurrentUser = (user) => ({
  type: CURRENT_USER,
  payload: user,
});
