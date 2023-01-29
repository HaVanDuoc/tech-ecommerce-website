import ModalAuthReducer from "../ModalAuth/ModalAuthReducer";
import NavbarReducer from "../Navbar/NavbarReducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  Navbar: NavbarReducer,
  ModalAuth: ModalAuthReducer,
});

export default rootReducer;
