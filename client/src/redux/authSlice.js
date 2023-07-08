import { createSlice } from "@reduxjs/toolkit"

export const formSignIn = "Sign In"
export const formSignUp = "Sign Up"
export const formForgotPassword = "Forgot Password"
export const formVerifyCode = "Verify Code"
export const formChangePassword = "Change Password"

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: {
            isLogged: false,
            user: null,
            refetch: false,
        },
        modalLogin: {
            isOpen: false,
            form: formSignIn,
        },
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
        refetchCurrentUser: (state) => {
            state.currentUser.refetch = !state.currentUser.refetch
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

        // Open modal
        openSignIn: (state) => {
            state.modalLogin.isOpen = true
            state.modalLogin.form = formSignIn
        },
        openSignUp: (state) => {
            state.modalLogin.isOpen = true
            state.modalLogin.form = formSignUp
        },
        openForgotPassword: (state) => {
            state.modalLogin.isOpen = true
            state.modalLogin.form = formForgotPassword
        },
        openVerifyCode: (state, action) => {
            state.modalLogin.isOpen = true
            state.modalLogin.form = formVerifyCode
            state.modalLogin["data"] = action.payload
        },
        openChangePassword: (state, action) => {
            state.modalLogin.isOpen = true
            state.modalLogin.form = formChangePassword
            state.modalLogin["data"] = action.payload
        },
        closeModalLogin: (state) => {
            state.modalLogin.isOpen = false
        },
    },
})

export const {
    currentUser,
    refetchCurrentUser,
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
    openSignIn,
    openSignUp,
    openForgotPassword,
    openVerifyCode,
    openChangePassword,
    closeModalLogin,
} = authSlice.actions

export const selectorCurrentUser = (state) => state.auth.currentUser
export const selectorStatusLogin = (state) => state.auth.login
export const selectorStatusRegister = (state) => state.auth.register
export const selectorModalLogin = (state) => state.auth.modalLogin

export default authSlice.reducer
