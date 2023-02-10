import NavbarReducer from "../Navbar/NavbarReducer";
import ModalContainerReducer from "../ModalContainer/ModalContainerReducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  Navbar: NavbarReducer,
  ModalContainer: ModalContainerReducer,
});

export default rootReducer;
