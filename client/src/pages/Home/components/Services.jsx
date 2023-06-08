import { Box, Container, Grid, Typography } from "@mui/material"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import FlashOnIcon from "@mui/icons-material/FlashOn"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import ExtensionIcon from "@mui/icons-material/Extension"

const Services = () => {
    return (
        <Box sx={styleService}>
            <Container maxWidth="lg" disableGutters>
                <Box sx={styles1}>
                    <Typography sx={styles2}>Dịch vụ tiện ích</Typography>

                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Box className="item col-1">
                                    <Box sx={styles3}>
                                        <Box className="icon" sx={{ backgroundColor: "#b1cde8" }}>
                                            <PhoneIphoneIcon sx={{ color: "#0555ab" }} />
                                        </Box>
                                        <Typography fontSize={24} padding="10px 0">
                                            Mua thẻ cào
                                        </Typography>
                                        <Typography fontSize={20} textAlign="center">
                                            <span style={{ color: "red" }}>Giảm 2%</span> cho mệnh giá từ 100.000 trở
                                            lên
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={3}>
                                <Box className="item col-2">
                                    <Box sx={styles4}>
                                        <Box className="icon" sx={{ backgroundColor: "#f0d45f" }}>
                                            <FlashOnIcon sx={{ color: "#fe780d" }} />
                                        </Box>
                                        <Typography fontSize={24} padding="10px 0">
                                            Dịch vụ đóng tiền
                                        </Typography>
                                        <Typography fontSize={20} textAlign="center">
                                            Điện, Nước, Internet, Cước điện thoại trả sau
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={3}>
                                <Box className="item col-3">
                                    <Box sx={styles5}>
                                        <Box className="icon" sx={styles6}>
                                            <SportsEsportsIcon sx={styles7} />
                                        </Box>
                                        <Typography fontSize={24} padding="10px 0">
                                            Mua thẻ game
                                        </Typography>
                                        <Typography fontSize={20} textAlign="center">
                                            <span style={{ color: "red" }}>Giảm 2%</span> cho tất cả các nhà mạng, áp
                                            dụng giá từ 300.000 trở lên
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={3}>
                                <Box className="item col-4">
                                    <Box sx={styles8}>
                                        <Box className="icon" sx={styles9}>
                                            <ExtensionIcon sx={styles10} />
                                        </Box>
                                        <Typography fontSize={24} padding="10px 0">
                                            Dịch vụ vệ sinh
                                        </Typography>
                                        <Typography fontSize={20} textAlign="center">
                                            Máy lạnh, Máy giặt, Quạt, PC, Laptop
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Services

const styleService = {
    margin: "30px 0",

    ".item": {
        borderRadius: "15px",
        overflow: "hidden",
        padding: "15px",
        height: "100%",
        cursor: "pointer",

        svg: {
            fontSize: "40px",
        },

        ".icon": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "14px",
            borderRadius: "50%",
        },
    },

    ".col-1": {
        backgroundColor: "#DCEEFF",
    },
    ".col-2": {
        backgroundColor: "#FEF5CF",
    },
    ".col-3": {
        backgroundColor: "#FFEFDB",
    },
    ".col-4": {
        backgroundColor: "#E1FECF",
    },
}

const styles1 = {
    backgroundColor: "#fff",
    padding: "24px",
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
}

const styles2 = {
    paddingBottom: "15px",
    fontWeight: 500,
    textTransform: "uppercase",
    fontSize: "20px",
}

const styles3 = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
}

const styles4 = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
}

const styles5 = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
}

const styles6 = {
    backgroundColor: "#ff939087",
}

const styles7 = {
    color: "#fd0802",
}

const styles8 = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
}

const styles9 = {
    backgroundColor: "#4de1504f",
}

const styles10 = {
    color: "#1ca91f",
}
