import NavbarReducer from "../Navbar/NavbarReducer";
import ModalContainerReducer from "../ModalContainer/ModalContainerReducer";
import Reducer from "../ButtonEditPageUpdateProductInAdmin/reducers";
import CurrentUserReducer from "../AuthCurrentUser/reducer";
import { FetchProducts } from "../home/fetchProducts/reducer";
import OrderReducer from "../profile/fetchOrders/reducer";
import { Search } from "../Search/reducer";
import { ProductsReducer } from "../products/reducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  Navbar: NavbarReducer,
  ModalContainer: ModalContainerReducer,
  ButtonEditPageUpdateProductInAdmin: Reducer,
  CurrentUser: CurrentUserReducer,
  HomeFetchProducts: FetchProducts,
  ProfileFetchOrders: OrderReducer,
  Search: Search,
  Products: ProductsReducer,
});

export default rootReducer;
