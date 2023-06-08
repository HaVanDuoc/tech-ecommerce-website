import { createSlice } from "@reduxjs/toolkit"

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        KhachHang: {
            isFetch: false,
            payload: {},
        },
        products: {
            refetch: false,
            isFetch: false,
            isPending: false,
            payload: {},
        },
        orders: {
            isFetch: false,
            payload: {},
        },
    },
    reducers: {
        startSetProduct: (state) => {
            state.products.isPending = true
        },
        setProducts: (state, action) => {
            state.products.isFetch = true
            state.products.countProduct = action.payload.countProduct
            state.products.counterPage = action.payload.counterPage
            state.products.limit = action.payload.limit
            state.products.payload[`page-${action.payload.currentPage}`] = action.payload.payload
        },
        refetchProduct: (state) => {
            state.products.refetch = !state.products.refetch
        },
        endSetProduct: (state) => {
            state.products.isPending = false
        },

        getOrdersAdmin: (state, action) => {
            state.orders.isFetch = true
            state.orders.countOrders = action.payload.countOrders
            state.orders.limit = action.payload.limit
            state.orders.payload[`page-${action.payload.currentPage}`] = action.payload.payload
        },
    },
})

export const selectorProductsAdmin = (state) => state.admin.products
export const selectorOrdersAdmin = (state) => state.admin.orders

export const { startSetProduct, setProducts, refetchProduct, endSetProduct, getOrdersAdmin } = adminSlice.actions

export default adminSlice.reducer
