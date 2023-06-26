import { Button, Typography } from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"
import { useDispatch } from "react-redux"
import { refetch } from "~/redux/userSlice"

const ButtonRefresh = () => {
    const dispatch = useDispatch()

    return (
        <Button sx={{ mr: 3 }} onClick={() => dispatch(refetch())}>
            <RefreshIcon />
            <Typography textTransform="none">Làm mới</Typography>
        </Button>
    )
}

export default ButtonRefresh
