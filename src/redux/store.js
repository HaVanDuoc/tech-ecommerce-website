import rootReducer from "./reducers";

const { createStore } = require("redux");

const store = createStore(rootReducer);

export default store
