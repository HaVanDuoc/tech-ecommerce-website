import { createSlice } from "@reduxjs/toolkit"

export const pageAdminOrderSlice = createSlice({
    name: "pageAdminOrder",
    initialState: {
        isPendingCount: false,
    },
    reducers: {
        setPendingCount: (state, action) => {
            state.isPendingCount = action.payload
        },
    },
})

export const selectorAdminOrder = (state) => state.adminOrder

export const { setPendingCount } = pageAdminOrderSlice.actions

export default pageAdminOrderSlice.reducer
