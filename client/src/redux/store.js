import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import productReducer from "./productSlice"
import searchReducer from "./searchSlice"
import adminReducer from "./adminSlice"
import brandReducer from "./brandSlice"
import orderReducer from "./orderSlice"
import userReducer from "./userSlice"
import categoryReducer from "./categorySlice"
import alertReducer from "./alertSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        search: searchReducer,
        admin: adminReducer,
        brand: brandReducer,
        order: orderReducer,
        user: userReducer,
        category: categoryReducer,
        alert: alertReducer,
    },
})

export default store
