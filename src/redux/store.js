import rootReducer from "./reducers";

import { createStore } from "@reduxjs/toolkit";

const store = createStore(rootReducer);

export default store;
