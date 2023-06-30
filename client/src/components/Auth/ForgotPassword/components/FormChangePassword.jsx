import { Box, Button, CircularProgress, Link, styled, TextField, Typography } from "@mui/material"
import { closeModalLogin, openSignIn, selectorModalLogin } from "~/redux/authSlice"
import { ErrorMessage, Field, Form, Formik } from "formik"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import React, { useState } from "react"
import axiosInstance from "~/api"
import { exportResponse, setResponse } from "~/redux/alertSlice"

const initialValues = {
    password: "",
    confirmPassword: "",
}

const validationSchema = Yup.object({
    password: Yup.string().min(6).required("*Bắt buộc"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "*Mật khẩu không trùng khớp")
        .required("*Bắt buộc"),
})

const FormChangePassword = () => {
    const [isPending, setPending] = useState(false)
    const email = useSelector(selectorModalLogin)?.data?.email
    const dispatch = useDispatch()

    return (
        <Styled>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, props) => {
                    setPending(true)
                    setTimeout(async () => {
                        const response = await axiosInstance("put", "/auth/changePassword", {
                            email: email,
                            password: values.password,
                        })

                        if (response.data.err === 0) {
                            dispatch(setResponse(response))
                            dispatch(exportResponse())
                            dispatch(closeModalLogin())
                        }

                        setPending(false)
                    }, 2000)
                }}
            >
                {(props) => (
                    <Form>
                        <Title>Thay đổi mật khẩu</Title>

                        <Field
                            as={TextField}
                            label="Mật khẩu mới"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: "15px" }}
                            id="password"
                            name="password"
                            type="password"
                            helperText={<ErrorMessage name="password" />}
                        />

                        <Field
                            as={TextField}
                            label="Nhập lại mật khẩu"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: "15px" }}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            helperText={<ErrorMessage name="confirmPassword" />}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{
                                margin: "15px 0",
                                height: "50px",
                            }}
                        >
                            {isPending ? <CircularProgress size={30} color="inherit" /> : "Thay đổi"}
                        </Button>

                        <LinkBackToLogin />
                    </Form>
                )}
            </Formik>
        </Styled>
    )
}

export default FormChangePassword

const Styled = styled(Box)(() => ({
    width: 400,

    "& .MuiFormHelperText-root": {
        color: "red",
    },
}))

const Title = styled(Box)(() => ({
    fontSize: "1.6rem",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: "20px",
}))

const LinkBackToLogin = () => {
    const dispatch = useDispatch()

    return (
        <Box textAlign="center">
            <Link
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 3,
                }}
                onClick={() => dispatch(openSignIn())}
            >
                <ArrowBackIcon fontSize="small" />
                <Typography>Trở về đăng nhập</Typography>
            </Link>
        </Box>
    )
}
