import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: {
            isLogged: false,
            user: null,
        },
        modalForm: true,
    },
    reducers: {
        currentUser: (state, action) => {
            state.currentUser.isLogged = true
            state.currentUser.user = action.payload
        },
        modalLoginForm: (state) => {
            state.modalForm = true
        },
        modalSignUpForm: (state) => {
            state.modalForm = false
        },
    },
})

export const { currentUser, modalLoginForm, modalSignUpForm } =
    authSlice.actions

export const selectorCurrentUser = (state) => state.auth.currentUser
export const selectorModalForm = (state) => state.auth.modalForm

export default authSlice.reducer
