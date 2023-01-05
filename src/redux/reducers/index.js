import NavbarReducer from "../Navbar/NavbarReducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  Navbar: NavbarReducer,
});

export default rootReducer;
