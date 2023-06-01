import { Box, Modal, styled } from "@mui/material"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import LoginForm from "~/components/Auth/LoginForm"
import SignUpForm from "~/components/Auth/SignupForm"
import { loginFail, registerFail, selectorModalForm } from "~/redux/authSlice"

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

const ModalLogin = ({ children }) => {
    const dispatch = useDispatch()

    // State for open Modal
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        dispatch(loginFail(null))
        dispatch(registerFail(null))
    }

    const show = useSelector(selectorModalForm)

    return (
        <Styled>
            {/* Button use Modal */}
            <Box onClick={handleOpen}>{children}</Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>{show ? <LoginForm /> : <SignUpForm />}</Box>
            </Modal>
        </Styled>
    )
}

export default ModalLogin
