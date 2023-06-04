import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: "product",
    initialState: {
        latest: {
            isFetch: false,
            products: null,
        },
        productsByCategory: {
            isPending: false,
            reFetch: false,
        },
        cart: {
            isFetch: false,
            isPending: false,
            products: null,
        },
        categories: {
            isFetch: false,
            categories: null,
        },
    },
    reducers: {
        setLatestProduct: (state, action) => {
            state.latest.isFetch = true
            state.latest.products = action.payload
        },

        // PRODUCT PAGE
        startProductByCategory: (state) => {
            state.productsByCategory.isPending = true
        },
        setProductByCategory: (state, action) => {
            if (!state.productsByCategory[`${action.payload.category}`]) {
                state.productsByCategory[`${action.payload.category}`] = {}
                state.productsByCategory[`${action.payload.category}`]["limit"] = action.payload.products.limitOfPage
                state.productsByCategory[`${action.payload.category}`]["counterPage"] =
                    action.payload.products.counterPage
                state.productsByCategory[`${action.payload.category}`]["counterProduct"] =
                    action.payload.products.counterProduct
            }

            state.productsByCategory[`${action.payload.category}`][`page-${action.payload.page}`] =
                action.payload.products.list
        },
        resetSateProductByCategory: (state) => {
            state.productsByCategory = {
                isPending: false,
                reFetch: false,
            }
        },
        reFetchProductPage: (state) => {
            state.productsByCategory.reFetch = !state.productsByCategory.reFetch
        },
        endProductByCategory: (state) => {
            state.productsByCategory.isPending = false
        },

        startFetchCardProduct: (state) => {
            state.cart.isPending = true
        },
        setCardProduct: (state, action) => {
            state.cart.isFetch = true
            state.cart.products = action.payload
        },
        endFetchCardProduct: (state) => {
            state.cart.isPending = false
        },
        setCategories: (state, action) => {
            state.categories.isFetch = true
            state.categories.categories = action.payload
        },
    },
})

export const {
    setLatestProduct,
    startProductByCategory,
    setProductByCategory,
    resetSateProductByCategory,
    reFetchProductPage,
    endProductByCategory,
    startFetchCardProduct,
    setCardProduct,
    endFetchCardProduct,
    setCategories,
} = productSlice.actions

export const selectorLatestProducts = (state) => state.product.latest
export const selectorProductByCategory = (state) => state.product.productsByCategory
export const selectorCartProducts = (state) => state.product.cart
export const selectorCategories = (state) => state.product.categories
export const selectorUrlParamsProductPage = (state) => state.product.urlParamsProductPage

export default productSlice.reducer
