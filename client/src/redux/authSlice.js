import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: {
            isLogged: false,
            user: null,
        },
        modalAuth: {
            isOpen: false,
            isForm: true, // default true is form login & false is form register
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

        isOpenModalLogin: (state) => {
            state.modalAuth.isOpen = !state.modalAuth.isOpen
        },
        modalLogin: (state) => {
            state.modalAuth.isOpen = true
            state.modalAuth.isForm = true
        },
        modalRegister: (state) => {
            state.modalAuth.isOpen = true
            state.modalAuth.isForm = false
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
    isOpenModalLogin,
    modalLogin,
    modalRegister,
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
export const selectorModalLogin = (state) => state.auth.modalAuth

export default authSlice.reducer
