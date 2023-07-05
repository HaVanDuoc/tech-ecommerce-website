import { createSlice } from "@reduxjs/toolkit"

export const pageProductDetailSlice = createSlice({
    name: "pageProductDetail",
    initialState: {
        formRating: {
            open: false,
        },
    },
    reducers: {
        setOpenFormRating: (state, action) => {
            state.formRating.open = action.payload
        },
    },
})

export const selectorOpenFormRating = (state) => state.productDetail.formRating.open

export const { setOpenFormRating } = pageProductDetailSlice.actions

export default pageProductDetailSlice.reducer
