import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import productReducer from "./productSlice"
import searchReducer from "./searchSlice"
import adminReducer from "./adminSlice"
import brandReducer from "./brandSlice"
import orderReducer from "./orderSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        search: searchReducer,
        admin: adminReducer,
        brand: brandReducer,
        order: orderReducer,
    },
})

export default store
