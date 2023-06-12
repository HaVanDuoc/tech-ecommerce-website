import { Box } from "@mui/material"
import { PF } from "~/utils/__variables"

const Background = () => {
    return (
        <Box sx={styles}>
            <img src={`${PF}/assets/profile/bg.webp`} alt="background" />
        </Box>
    )
}

export default Background

const styles = {
    display: "flex",
    width: "100%",
    height: "300px",
    overflow: "hidden",

    "&:after": {
        content: `""`,
        display: "block",
        position: "absolute",
        top: 0,
        width: "100%",
        height: "300px",
        boxShadow: "inset 0 0 50px 50px rgba(0, 0, 0, 0.4)",
    },

    "& img": {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        boxShadow: "inset 0 0 20px 50px rgba(0, 0, 0, 1)",
    },
}
