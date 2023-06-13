import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: "product",
    initialState: {
        pageHome: {},
        productsByCategory: {
            isPending: false,
            reFetch: false,
        },
        cart: {
            isFetch: false,
            isPending: false,
            refetch: false,
            counter: 0,
            refetchCounter: false,
            data: null,
        },
        product: {
            reFetch: false,
            isPending: false,
            data: null,
        },
        categories: {},
        brands: {},
    },
    reducers: {
        setLatestProduct: (state, action) => {
            if (!state.pageHome.latest) {
                state.pageHome["latest"] = {
                    isPending: false,
                    payload: {},
                }
            }

            state.pageHome.latest["limit"] = action.payload.limitOfPage
            state.pageHome.latest["currentPage"] = action.payload.currentPage
            state.pageHome.latest["sumPages"] = action.payload.counterPage
            state.pageHome.latest["sumProducts"] = action.payload.counterProduct

            state.pageHome.latest.payload[`${action.payload.currentPage}`] = action.payload.list
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

        setCategories: (state, action) => {
            state.categories = action.payload
        },

        setBrands: (state, action) => {
            state[`${action.payload.link}`] = action.payload.brands
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
    setCategories,
    startSetProduct,
    setProduct,
    reFetchProduct,
    endSetProduct,
} = productSlice.actions

export const selectorProductByCategory = (state) => state.product.productsByCategory
export const selectorCartProducts = (state) => state.product.cart
export const selectorCategories = (state) => state.product.categories
export const selectorUrlParamsProductPage = (state) => state.product.urlParamsProductPage
export const selectorProduct = (state) => state.product.product

export const selectorProducts = (state) => state.product

export default productSlice.reducer
