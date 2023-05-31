import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import productReducer from "./productSlice"
import searchReducer from "./searchSlice"
import productByTypeReducer from "./productByTypeSlice"
import adminReducer from "./adminSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        search: searchReducer,
        productByType: productByTypeReducer,
        admin: adminReducer,
    },
})

export default store
