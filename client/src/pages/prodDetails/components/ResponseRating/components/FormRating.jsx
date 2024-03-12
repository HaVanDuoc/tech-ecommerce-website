import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectorOpenFormRating, setOpenFormRating } from "~/redux/pageProductDetailSlice"

const FormRating = () => {
    const [open, setOpen] = useState(false)
    const openForm = useSelector(selectorOpenFormRating)
    const dispatch = useDispatch()

    useEffect(() => {
        setOpen(openForm)
    }, [openForm])

    const handleClose = () => {
        dispatch(setOpenFormRating(false))
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <Stack>
                <Typography>Đánh giá</Typography>
                <IconButton></IconButton>
            </Stack>

            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FormRating
