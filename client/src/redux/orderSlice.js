import { createSlice } from "@reduxjs/toolkit"

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: {
            isPending: false,
            isFetch: false,
            refetch: false,
            data: {},
        },
        tabs: {
            isFetch: false,
            data: {},
        },
    },
    reducers: {
        isPending: (state) => {
            state.order.isPending = !state.order.isPending
        },
        refetch: (state) => {
            state.order.refetch = !state.order.refetch
        },
        setOrders: (state, action) => {
            if (!state.order.data[`${action.payload.tab}`]) {
                state.order.data[`${action.payload.tab}`] = {}
                state.order.data[`${action.payload.tab}`]["amountPages"] = action.payload.data.amountPages
                state.order.data[`${action.payload.tab}`]["amountProducts"] = action.payload.data.amountProducts
            }

            state.order.data[`${action.payload.tab}`][`page-${action.payload.page}`] = action.payload.data.orders
        },
        setTabs: (state, action) => {
            state.tabs.isFetch = true
            state.tabs.data = action.payload
        },
    },
})

export const { isPending, refetch, setOrders, setTabs } = orderSlice.actions

export const selectorOrders = (state) => state.order.order
export const selectorTabs = (state) => state.order.tabs

export default orderSlice.reducer
