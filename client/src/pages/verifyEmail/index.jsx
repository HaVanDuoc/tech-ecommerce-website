import { Link, Stack, Typography, styled } from "@mui/material"
import React, { useEffect } from "react"
import { useJwt } from "react-jwt"
import { useDispatch } from "react-redux"
import axiosInstance from "~/api"
import { endRegister, registerFail } from "~/redux/authSlice"
import { PF } from "~/utils/__variables"

const Wrapper = styled(Stack)(() => ({
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
}))

const VerifyEmail = () => {
    const token = new URLSearchParams(window.location.search).get("token")
    const { decodedToken, isExpired } = useJwt(token)
    const dispatch = useDispatch()

    console.log(decodedToken)
    console.log(isExpired)

    useEffect(() => {
        const data = {
            isVerify: true,
            firstName: decodedToken ? decodedToken.firstName : "",
            middleName: decodedToken ? decodedToken.middleName : "",
            lastName: decodedToken ? decodedToken.lastName : "",
            email: decodedToken ? decodedToken.email : "",
            password: decodedToken ? decodedToken.password : "",
        }

        if (decodedToken && !isExpired) {
            const request = async () => {
                const response = await axiosInstance("post", "/auth/register", data)

                dispatch(endRegister())

                if (response.data.err !== 0) {
                    dispatch(registerFail(response.data.msg))
                } else {
                    localStorage.setItem("access_token", response.data.access_token)
                }
            }

            request()
        }
    }, [decodedToken, isExpired, dispatch])

    return <Wrapper>{isExpired ? <Expired /> : <Activated />}</Wrapper>
}

const Activated = () => {
    return (
        <Stack
            sx={{
                width: "70%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 5,
                "& img": {
                    width: "300px",
                },
            }}
        >
            <img src={PF + "/assets/verify-mail.png"} alt="" />
            <Typography
                sx={{
                    fontSize: 30,
                    marginBottom: 3,
                }}
            >
                Kích hoạt Email thành công!
            </Typography>
            <Typography sx={{ fontSize: 22, color: "#888", lineHeight: "30px" }}>Chào mừng đến với Tech</Typography>
            <Typography sx={{ fontSize: 20, color: "#888", lineHeight: "30px" }}>
                Hãy thỏa sức mua sắm cùng Tech!
            </Typography>

            <Link
                href="/"
                sx={{
                    display: "flex",
                    width: 250,
                    height: 60,
                    backgroundColor: "dodgerblue",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontSize: 28,
                    m: 3,
                    cursor: "pointer",
                    borderRadius: 2,
                    transition: "all .3s ease",

                    ":hover": {
                        backgroundColor: "#1376d7",
                    },
                }}
            >
                Mua sắm
            </Link>
        </Stack>
    )
}

const Expired = () => {
    return (
        <Stack
            sx={{
                width: "70%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 15,
                "& img": {
                    width: "200px",
                },
            }}
        >
            <img src={PF + "/assets/spam.png"} alt="" />
            <Typography
                sx={{
                    fontSize: 30,
                    marginTop: 3,
                    marginBottom: 3,
                }}
            >
                Mail xác nhận đã quá hạn!
            </Typography>
            <Typography sx={{ fontSize: 22, color: "#888", lineHeight: "30px" }}>Vui lòng thử lại!</Typography>
        </Stack>
    )
}

export default VerifyEmail
