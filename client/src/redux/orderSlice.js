import { createSlice } from "@reduxjs/toolkit"

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: {
            isPending: false,
            isFetch: false,
            refetch: false,
            payload: {},
        },
        tabs: {
            isFetch: false,
            data: {},
        },
        createOrder: {
            isPending: false,
            response: null,
        },
    },
    reducers: {
        isPending: (state) => {
            state.orders.isPending = !state.orders.isPending
        },
        refetch: (state) => {
            state.orders.refetch = !state.orders.refetch
        },
        setOrders: (state, action) => {
            const orders = state.orders.payload
            const type = action.payload.type
            const page = action.payload.page
            const payload = action.payload.payload

            if (!orders[`${type}`]) {
                orders[`${type}`] = {}
                orders[`${type}`]["sumPages"] = payload.sumPages
                orders[`${type}`]["sumProducts"] = payload.sumProducts
            }

            orders[`${type}`][`page-${page}`] = payload.payload
        },
        setTabs: (state, action) => {
            state.tabs.isFetch = true
            state.tabs.data = action.payload
        },

        isPendingCreateOrder: (state) => {
            state.createOrder.isPending = !state.createOrder.isPending
        },
        setCreateOrder: (state, action) => {
            state.createOrder.response = action.payload
        },
        resetCreateOrder: (state) => {
            state.createOrder = {
                isPending: false,
                response: null,
            }
        },
    },
})

export const { isPending, refetch, setOrders, setTabs, setCreateOrder, isPendingCreateOrder, resetCreateOrder } =
    orderSlice.actions

export const selectorOrders = (state) => state.order.orders
export const selectorTabs = (state) => state.order.tabs
export const selectorCreateOrder = (state) => state.order.createOrder

export default orderSlice.reducer
