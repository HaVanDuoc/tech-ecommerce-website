import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        header: {
            recent: {
                isFetch: false,
                isPending: false,
                result: [],
            },
            suggest: {
                isFetch: false,
                isPending: false,
                result: [],
            },
        },
    },
    reducers: {
        startSearchHeaderRecent: (state) => {
            state.header.recent.isPending = true
        },
        setSearchHeaderRecent: (state, action) => {
            state.header.recent.isFetch = true
            state.header.recent.result = action.payload
        },
        endSearchHeaderRecent: (state) => {
            state.header.recent.isPending = false
        },
        startSearchHeaderSuggest: (state) => {
            state.header.suggest.isPending = true
        },
        setSearchHeaderSuggest: (state, action) => {
            state.header.suggest.result = action.payload
        },
        endSearchHeaderSuggest: (state) => {
            state.header.suggest.isPending = false
        },
    },
})

export const {
    startSearchHeaderRecent,
    setSearchHeaderRecent,
    endSearchHeaderRecent,
    startSearchHeaderSuggest,
    setSearchHeaderSuggest,
    endSearchHeaderSuggest,
} = searchSlice.actions

export const selectorSearchHeader = (state) => state.search.header

export default searchSlice.reducer
