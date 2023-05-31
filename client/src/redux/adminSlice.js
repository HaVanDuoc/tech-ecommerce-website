import { createSlice } from "@reduxjs/toolkit"

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        KhachHang: {
            isFetch: false,
            payload: {},
        },
        products: {
            isFetch: false,
            payload: {},
        },
        orders: {
            isFetch: false,
            payload: {},
        },
    },
    reducers: {
        getUsersAdmin: (state, action) => {
            state.products.isFetch = true
            state.products.countProduct = action.payload.countProduct
            state.products.limit = action.payload.limit
            state.products.payload[`page-${action.payload.currentPage}`] = action.payload.payload
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

export const { getUsersAdmin, getOrdersAdmin } = adminSlice.actions

export default adminSlice.reducer
