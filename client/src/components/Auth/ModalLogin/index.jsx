import { Box, Modal, styled } from "@mui/material"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import LoginForm from "~/components/Auth/LoginForm"
import SignUpForm from "~/components/Auth/SignupForm"
import { isOpenModalLogin, loginFail, registerFail, selectorModalLogin } from "~/redux/authSlice"

const ModalLogin = () => {
    const modal = useSelector(selectorModalLogin)

    console.log("modal", modal)
    const dispatch = useDispatch()

    // State for open Modal
    // const [open, setOpen] = React.useState(false)

    // const handleOpen = () => setOpen(true)

    const handleClose = () => {
        // setOpen(false)
        dispatch(loginFail(null))
        dispatch(registerFail(null))
        dispatch(isOpenModalLogin())
    }

    // const show = useSelector(selectorModalForm)

    return (
        <Styled>
            {/* Button use Modal */}
            {/* <Box onClick={handleOpen}>{children}</Box> */}

            <Modal
                open={modal.isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>{modal?.isForm ? <LoginForm /> : <SignUpForm />}</Box>
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
