import React, { Fragment } from "react"
import { Box, Modal, styled } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import LoginForm from "~/components/Auth/LoginForm"
import SignUpForm from "~/components/Auth/SignupForm"
import {
    closeModalLogin,
    formChangePassword,
    formForgotPassword,
    formSignIn,
    formSignUp,
    formVerifyCode,
    selectorModalLogin,
} from "~/redux/authSlice"
import ForgotPassword from "../ForgotPassword"
import FormVerifyCode from "../ForgotPassword/components/FormVerifyCode"
import FormChangePassword from "../ForgotPassword/components/FormChangePassword"

const ModalLogin = () => {
    const modal = useSelector(selectorModalLogin)
    const dispatch = useDispatch()

    const form =
        modal.form === formSignIn ? (
            <LoginForm />
        ) : modal.form === formSignUp ? (
            <SignUpForm />
        ) : modal.form === formForgotPassword ? (
            <ForgotPassword />
        ) : modal.form === formVerifyCode ? (
            <FormVerifyCode />
        ) : modal.form === formChangePassword ? (
            <FormChangePassword />
        ) : (
            <Fragment />
        )

    const handleClose = () => {
        dispatch(closeModalLogin())
    }

    return (
        <Styled>
            <Modal
                open={modal.isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>{form}</Box>
            </Modal>
        </Styled>
    )
}

export default ModalLogin

const Styled = styled(Box)(() => ({}))

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid transparent",
    borderRadius: "var(--border-radius)",
    boxShadow: 24,
    p: 4,
}
