import { Box, Container, Stack } from "@mui/material"
import { PF } from "~/utils/__variables"

const SpecialBrand = () => {
    return (
        <Box sx={styles1}>
            <Container maxWidth="lg" disableGutters>
                <Stack flexDirection="row" alignItems="center" justifyContent="center" sx={styles2}>
                    {brand.map((item) => (
                        <Box key={item.id} sx={styles3}>
                            <img src={PF + "/assets/brand-special/" + item.img} alt="" width="100%" />
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    )
}

export default SpecialBrand

const brand = [
    {
        id: 1,
        img: "sony.png",
    },
    {
        id: 2,
        img: "sandisk.png",
    },
    {
        id: 3,
        img: "dell.png",
    },
    {
        id: 4,
        img: "lg.png",
    },
    {
        id: 5,
        img: "bose.png",
    },
    {
        id: 6,
        img: "samsung.png",
    },
    {
        id: 7,
        img: "canon.png",
    },
]

const styles1 = {
    backgroundColor: "#fff",
    paddingBottom: "80px",
}

const styles2 = {
    boxShadow: "0 0 3px 1px rgba(0, 0, 0, 0.175)",
    padding: "30px 0",
    borderRadius: "8px",
}

const styles3 = {
    width: "calc(100/7)%",
    padding: 2,
    cursor: "pointer",
}
