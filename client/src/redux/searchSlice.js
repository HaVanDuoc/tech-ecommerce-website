import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        recent: {
            isPending: false,
            result: null,
        },
    },
    reducers: {
        searchRecent: (state, action) => {
            state.recent.isPending = true
            state.recent.result = action.payload
        },
    },
})

export const { searchRecent } = searchSlice.actions

export const selectorSearchRecent = (state) => state.search.recent

export default searchSlice.reducer
