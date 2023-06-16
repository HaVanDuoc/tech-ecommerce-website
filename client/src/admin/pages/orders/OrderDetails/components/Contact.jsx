import { Avatar, Stack, Typography, styled } from "@mui/material"
import React from "react"
import Title from "./Title"
import { PF } from "~/utils/__variables"

const Contact = ({ avatar }) => {
    return (
        <Stack className="section">
            <Title>Liên lạc</Title>

            <Stack flexDirection="row" sx={styles2}>
                <AvatarCustomer sx={{ aspectRatio: "1/1" }}>
                    <Avatar src={avatar} alt="" sx={{ width: "80%", height: "80%" }} />
                </AvatarCustomer>
                <MessageCustomer flex={1} className="icon">
                    <Stack justifyContent="center" alignItems="center">
                        <img src={PF + "/assets/admin-order-detail/icon-message.png"} alt="" />
                        <Typography>Gửi lời nhắn</Typography>
                    </Stack>
                </MessageCustomer>
                <CallCustomer flex={1} className="icon">
                    <Stack justifyContent="center" alignItems="center">
                        <img src={PF + "/assets/admin-order-detail/icon-call-phone.png"} alt="" />
                        <Typography>Gọi điện</Typography>
                    </Stack>
                </CallCustomer>
            </Stack>
        </Stack>
    )
}

export default Contact

const AvatarCustomer = styled(Stack)(() => ({}))
const MessageCustomer = styled(Stack)(() => ({}))
const CallCustomer = styled(Stack)(() => ({}))

const styles2 = {
    "& > :nth-child(n)": {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    ".icon": {
        cursor: "pointer",

        ":hover": {
            "& p": {
                color: "dodgerblue",
            },
        },

        "& img": {
            width: 50,
            height: 50,
        },

        "& p": {
            fontWeight: 500,
        },
    },
}
