import NavbarReducer from "../Navbar/NavbarReducer";
import ModalContainerReducer from "../ModalContainer/ModalContainerReducer";
import Reducer from "../ButtonEditPageUpdateProductInAdmin/reducers";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  Navbar: NavbarReducer,
  ModalContainer: ModalContainerReducer,
  ButtonEditPageUpdateProductInAdmin: Reducer,
});

export default rootReducer;
