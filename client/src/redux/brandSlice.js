import { createSlice } from "@reduxjs/toolkit"

export const brandSlice = createSlice({
    name: "brand",
    initialState: {
        brands: {
            isPending: false,
            refetch: false,
            payload: null,
        },

        brand: {
            isPending: false,
            refetch: false,
            payload: null,
        },

        updateBrand: {
            isPending: false,
            response: null,
        },
    },
    reducers: {
        setBrands: (state, action) => {
            if (!state.brands.payload) state.brands.payload = {}
            state.brands.payload[`${action.payload.type}`] = action.payload.payload
        },
        refetchBrands: (state) => {
            state.brands.refetch = !state.brands.refetch
        },
        isPendingGetBrands: (state) => {
            state.brands.isPending = !state.brands.isPending
        },

        setBrand: (state, action) => {
            state.brand.payload = action.payload
        },
        isPendingGetBrand: (state) => {
            state.brand.isPending = !state.brand.isPending
        },
        refetchBrand: (state) => {
            state.brand.refetch = !state.brand.refetch
        },
        resetBrand: (state) => {
            state.brand = {
                isPending: false,
                refetch: false,
                payload: null,
            }
        },

        isPendingUpdateBrand: (state) => {
            state.updateBrand.isPending = !state.updateBrand.isPending
        },
        responseUpdateBrand: (state, action) => {
            state.updateBrand.response = action.payload
        },
        resetUpdateBrand: (state) => {
            state.updateBrand = {
                isPending: false,
                response: null,
            }
        },
    },
})

export const selectorBrands = (state) => state.brand.brands
export const selectorBrand = (state) => state.brand.brand
export const selectorUpdateBrand = (state) => state.brand.updateBrand

export const {
    setBrands,
    refetchBrands,
    isPendingGetBrands,
    setBrand,
    isPendingGetBrand,
    refetchBrand,
    resetBrand,
    isPendingUpdateBrand,
    responseUpdateBrand,
    resetUpdateBrand,
} = brandSlice.actions

export default brandSlice.reducer
