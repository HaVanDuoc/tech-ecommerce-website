import { useNavigate } from "react-router-dom"

const { Typography, Box, Button, Stack } = require("@mui/material")

export const Container = ({ children }) => <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>{children}</Box>

export const Wrap = ({ children }) => {
    return <Box sx={{ borderRadius: 2, boxShadow: " 0px 0px 15px 0px rgba(0,0,0,0.35)" }}>{children}</Box>
}

export const AdminTitle = ({ children }) => (
    <Typography fontSize={28} textTransform="uppercase" mx={2} my={1}>
        {children}
    </Typography>
)

export const FieldForm = ({ children }) => (
    <Box
        sx={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
            marginRight: "20px",
            marginBottom: 2,

            "& > input": {
                height: "45px",
                padding: "10px",
                border: "1px solid gray",
                borderRadius: "5px",
                fontSize: "16px",
            },
        }}
    >
        {children}
    </Box>
)

export const LabelField = ({ children }) => (
    <Box
        sx={{
            marginBottom: "10px",
            fontSize: "14px",
            fontWeight: "600",
            color: "#979696",
        }}
    >
        {children}
    </Box>
)

export const StackButtons = ({ children }) => {
    return (
        <Stack
            flex={1}
            display="flex"
            flexDirection="row"
            justifyContent="right"
            sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)", padding: 2 }}
        >
            {children}
        </Stack>
    )
}

export const ButtonCreate = ({ children, to }) => {
    const navigate = useNavigate()

    const onClick = (to) => navigate(`${to}`)

    const style = {
        backgroundColor: "teal",
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 2,
        textTransform: "capitalize",
        maxHeight: "42px",

        "&:hover": {
            backgroundColor: "#036363",
        },
    }

    return (
        <Button onClick={() => onClick(to)} variant="contained" sx={style}>
            {children || ""}
        </Button>
    )
}
