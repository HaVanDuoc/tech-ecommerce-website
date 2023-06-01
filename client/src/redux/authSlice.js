import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: {
            isLogged: false,
            user: null,
        },
        modalForm: true,
        login: {
            isPending: false,
            error: null,
        },
        register: {
            isPending: false,
            error: null,
        },
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
        startLogin: (state) => {
            state.login.isPending = true
        },
        loginFail: (state, action) => {
            state.login.error = action.payload
        },
        endLogin: (state) => {
            state.login.isPending = false
        },
        startRegister: (state) => {
            state.register.isPending = true
        },
        registerFail: (state, action) => {
            state.register.error = action.payload
        },
        endRegister: (state) => {
            state.register.isPending = false
        },
    },
})

export const {
    currentUser,
    modalLoginForm,
    modalSignUpForm,
    startLogin,
    loginFail,
    endLogin,
    startRegister,
    registerFail,
    endRegister,
} = authSlice.actions

export const selectorCurrentUser = (state) => state.auth.currentUser
export const selectorModalForm = (state) => state.auth.modalForm
export const selectorStatusLogin = (state) => state.auth.login
export const selectorStatusRegister = (state) => state.auth.register

export default authSlice.reducer
