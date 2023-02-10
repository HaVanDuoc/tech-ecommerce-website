import LoginForm from "~/components/Auth/LoginForm";
import SignUpForm from "~/components/Auth/SignupForm";
import { SHOW_LOGIN_FORM, SHOW_SIGNUP_FORM } from "./ModalContainerConstant";

const INIT_STATE = {
  show: null,
};

const ModalContainerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_LOGIN_FORM:
      return {
        show: <LoginForm />,
      };

    case SHOW_SIGNUP_FORM:
      return {
        show: <SignUpForm />,
      };

    default:
      return state;
  }
};

export default ModalContainerReducer;

export const selectorShow = (state) => state.ModalContainer.show;
