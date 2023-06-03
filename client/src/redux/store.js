import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import productReducer from "./productSlice"
import searchReducer from "./searchSlice"
import productByTypeReducer from "./productByTypeSlice"
import adminReducer from "./adminSlice"
import brandReducer from "./brandSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        search: searchReducer,
        productByType: productByTypeReducer,
        admin: adminReducer,
        brand: brandReducer,
    },
})

export default store
