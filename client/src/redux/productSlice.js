import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: "product",
    initialState: {
        home: {
            latest: {
                isPending: false,
                payload: {},
            },
        },
        productsByCategory: {
            isPending: false,
            reFetch: false,
        },
        cart: {
            isFetch: false,
            isPending: false,
            refetch: false,
            counter: null,
            refetchCounter: false,
            data: null,
        },
        product: {
            reFetch: false,
            isPending: false,
            data: null,
        },
        search: {
            isPending: false,
            refetch: false,
            payload: {},
        },
    },
    reducers: {
        setSearch: (state, action) => {
            state.search.payload = action.payload
        },
        isPendingSearch: (state) => {
            state.search.isPending = !state.search.isPending
        },
        resetSearch: (state) => {
            state.search = {
                isPending: false,
                refetch: false,
                payload: {},
            }
        },

        setLatestProduct: (state, action) => {
            state.home.latest["limit"] = action.payload.limitOfPage
            state.home.latest["currentPage"] = action.payload.currentPage
            state.home.latest["sumPages"] = action.payload.counterPage
            state.home.latest["sumProducts"] = action.payload.counterProduct

            state.home.latest.payload[`${action.payload.currentPage}`] = action.payload.list
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
        pendingCartProduct: (state) => {
            state.cart.isPending = !state.cart.isPending
        },
        setCardProduct: (state, action) => {
            state.cart.isFetch = true
            state.cart.data = action.payload
        },
        refetchCart: (state) => {
            state.cart.refetch = !state.cart.refetch
        },
        endFetchCardProduct: (state) => {
            state.cart.isPending = false
        },
        setCounterCartProduct: (state, action) => {
            state.cart.counter = action.payload
        },
        refetchCounterCartProduct: (state) => {
            state.cart.refetchCounter = !state.cart.refetchCounter
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
    pendingCartProduct,
    setCardProduct,
    refetchCart,
    endFetchCardProduct,
    setCounterCartProduct,
    refetchCounterCartProduct,
    startSetProduct,
    setProduct,
    reFetchProduct,
    endSetProduct,
    setSearch,
    isPendingSearch,
    resetSearch,
} = productSlice.actions

export const selectorProductByCategory = (state) => state.product.productsByCategory
export const selectorCartProducts = (state) => state.product.cart
export const selectorUrlParamsProductPage = (state) => state.product.urlParamsProductPage
export const selectorProduct = (state) => state.product.product

export const selectorProducts = (state) => state.product
export const selectorSearch = (state) => state.product.search

export default productSlice.reducer
