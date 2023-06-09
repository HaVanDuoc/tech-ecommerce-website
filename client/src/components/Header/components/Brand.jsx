import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Brand = () => {
    return (
        <Box>
            <Link to="/">
                <Typography sx={{ fontSize: "2em", color: "var(--color-main)", cursor: "pointer" }}>Tech</Typography>
            </Link>
        </Box>
    )
}

export default Brand
