import { createSlice } from "@reduxjs/toolkit"

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: {
            isPending: false,
            refetch: false,
            payload: null,
        },
        category: {
            isPending: false,
            refetch: false,
            payload: null,
        },

        updateCategory: {
            isPending: false,
            response: null,
        },
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories.payload = action.payload
        },
        isPendingGetCategories: (state) => {
            state.categories.isPending = !state.categories.isPending
        },
        refetchGetCategories: (state) => {
            state.categories.refetch = !state.categories.refetch
        },

        setCategory: (state, action) => {
            state.category.payload = action.payload
        },
        isPendingGetCategory: (state) => {
            state.category.isPending = !state.category.isPending
        },
        refetchCategory: (state) => {
            state.category.refetch = !state.category.refetch
        },

        isPendingUpdateCategory: (state) => {
            state.updateCategory.isPending = !state.updateCategory.isPending
        },
        responseUpdateCategory: (state, action) => {
            state.updateCategory.response = action.payload
        },
        resetUpdateCategory: (state) => {
            state.updateCategory.isPending = {
                isPending: false,
                response: null,
            }
        },
    },
})

export const selectorCategories = (state) => state.category.categories
export const selectorCategory = (state) => state.category.category
export const selectorUpdateCategory = (state) => state.category.updateCategory

export const {
    setCategories,
    isPendingGetCategories,
    refetchGetCategories,
    setCategory,
    isPendingGetCategory,
    refetchCategory,
    isPendingUpdateCategory,
    responseUpdateCategory,
    resetUpdateCategory,
} = categorySlice.actions

export default categorySlice.reducer
