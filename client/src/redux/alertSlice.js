import { createSlice } from "@reduxjs/toolkit"

export const timeout = 4000

export const alertSlice = createSlice({
    name: "alert",
    initialState: {
        response: {
            export: false,
            payload: null,
        },
    },
    reducers: {
        setResponse: (state, action) => {
            state.response.payload = action.payload
        },
        exportResponse: (state) => {
            state.response.export = !state.response.export
        },
        resetResponse: (state) => {
            state.response = {
                export: false,
                payload: null,
            }
        },
    },
})

export const selectorResponse = (state) => state.alert.response

export const { setResponse, exportResponse, resetResponse } = alertSlice.actions

export default alertSlice.reducer
