import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: "product",
    initialState: {
        latestProducts: {
            isFetch: false,
            products: null,
        },
        cart: {
            isFetch: false,
            products: null,
        },
        categories: {
            isFetch: false,
            categories: null,
        },
    },
    reducers: {
        latestProducts: (state, action) => {
            state.latestProducts.isFetch = true
            state.latestProducts.products = action.payload
        },
        getCartProducts: (state, action) => {
            state.cart.isFetch = true
            state.cart.products = action.payload
        },
        getCategories: (state, action) => {
            state.categories.isFetch = true
            state.categories.categories = action.payload
        },
    },
})

export const { latestProducts, getCartProducts, getCategories, getMobile } = productSlice.actions

export const selectorLatestProducts = (state) => state.product.latestProducts
export const selectorCartProducts = (state) => state.product.cart
export const selectorCategories = (state) => state.product.categories

export default productSlice.reducer
