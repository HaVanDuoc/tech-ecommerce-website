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
        product: {
            reFetch: false,
            isPending: false,
            data: null,
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

        // CART
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

        // CATEGORY
        setCategories: (state, action) => {
            state.categories.isFetch = true
            state.categories.categories = action.payload
        },

        // PRODUCT
        startSetProduct: (state) => {
            state.product.isPending = true
        },
        setProduct: (state, action) => {
            state.product.data = action.payload
        },
        reFetchProduct: (state) => {
            state.product.reFetch = !state.product.reFetch
        },
        endSetProduct: (state) => {
            state.product.isPending = false
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
    startSetProduct,
    setProduct,
    reFetchProduct,
    endSetProduct,
} = productSlice.actions

export const selectorLatestProducts = (state) => state.product.latest
export const selectorProductByCategory = (state) => state.product.productsByCategory
export const selectorCartProducts = (state) => state.product.cart
export const selectorCategories = (state) => state.product.categories
export const selectorUrlParamsProductPage = (state) => state.product.urlParamsProductPage
export const selectorProduct = (state) => state.product.product

export default productSlice.reducer
