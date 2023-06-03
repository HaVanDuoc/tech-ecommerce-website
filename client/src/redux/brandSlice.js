import { createSlice } from "@reduxjs/toolkit"

export const brandSlice = createSlice({
    name: "brand",
    initialState: {},
    reducers: {
        setBrandByCategory: (state, action) => {
            state[`${action.payload.link}`] = action.payload.brands
        },
    },
})

export const selectorBrand = (state) => state.brand

export const { setBrandByCategory } = brandSlice.actions

export default brandSlice.reducer
