import { createSlice } from "@reduxjs/toolkit"

export const pageHomeSlice = createSlice({
    name: "pageHome",
    initialState: {
        suggestToday: {
            isPending: false,
            refetch: false,
            payload: {},
        },
    },
    reducers: {
        setPendingSuggestToday: (state, action) => {
            state.suggestToday.isPending = action.payload
        },
        refetchSuggestToday: (state) => {
            state.suggestToday.refetch = !state.suggestToday.refetch
        },
        setSuggestToday: (state, action) => {
            state.suggestToday.payload = action.payload
        },
    },
})

export const selectorSuggestToday = (state) => state.home.suggestToday

export const { setPendingSuggestToday, setSuggestToday, refetchSuggestToday } = pageHomeSlice.actions

export default pageHomeSlice.reducer
