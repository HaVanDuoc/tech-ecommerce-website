import { SHOW_LOGIN_FORM, SHOW_SIGNUP_FORM } from "./ModalContainerConstant.js";

export const showLoginForm = () => ({
  type: SHOW_LOGIN_FORM,
});

export const showSignUpForm = () => ({
  type: SHOW_SIGNUP_FORM,
});
