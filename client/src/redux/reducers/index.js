import NavbarReducer from "../Navbar/NavbarReducer";
import ModalContainerReducer from "../ModalContainer/ModalContainerReducer";
import Reducer from "../ButtonEditPageUpdateProductInAdmin/reducers";
import CurrentUserReducer from "../AuthCurrentUser/reducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  Navbar: NavbarReducer,
  ModalContainer: ModalContainerReducer,
  ButtonEditPageUpdateProductInAdmin: Reducer,
  CurrentUser: CurrentUserReducer,
});

export default rootReducer;
