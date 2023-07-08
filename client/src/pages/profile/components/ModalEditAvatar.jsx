import React, { useState } from "react"
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Stack,
} from "@mui/material"
import Avatar from "react-avatar-edit"
import { useDispatch, useSelector } from "react-redux"
import {
    selectorOpenModalEditAvatar,
    selectorPendingUpdateAvatar,
    setOpenModalEditAvatar,
} from "~/redux/pageProfileSlice"
import { selectorCurrentUser } from "~/redux/authSlice"
import { requestGetCurrentUser, requestUpdateAvatar } from "~/api"
import refreshPage from "~/utils/refreshPage"

const ModalEditAvatar = () => {
    const userId = useSelector(selectorCurrentUser)?.user?.userId
    const open = useSelector(selectorOpenModalEditAvatar)?.open
    const isPending = useSelector(selectorPendingUpdateAvatar)?.isPending
    const dispatch = useDispatch()

    const [preview, setPreview] = useState(null)
    const [src] = useState(null)

    const onClose = () => {
        setPreview(null)
    }

    const onCrop = (view) => {
        setPreview(view)
    }

    const handleClose = () => {
        dispatch(setOpenModalEditAvatar(false))
    }

    const handleSave = () => {
        requestUpdateAvatar(dispatch, { userId, avatar: preview })
        setTimeout(() => {
            handleClose()
            requestGetCurrentUser(dispatch)

            setTimeout(() => {
                refreshPage()
            }, 1500)
        }, 1000)
    }

    return (
        <Stack justifyContent="center">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle textAlign="center">{"Cập nhật ảnh đại diện"}</DialogTitle>
                <DialogContent>
                    <Avatar width={500} height={500} onCrop={onCrop} onClose={onClose} src={src} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSave}>{isPending ? <CircularProgress size={16} /> : "Lưu"}</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}

export default ModalEditAvatar

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})
