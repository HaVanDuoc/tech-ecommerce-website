import { Alert, Box, Button, CircularProgress, Link, Stack, styled, TextField, Typography } from "@mui/material"
import { openSignIn, openVerifyCode } from "~/redux/authSlice"
import { ErrorMessage, Field, Form, Formik } from "formik"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useDispatch } from "react-redux"
import * as Yup from "yup"
import React, { useState } from "react"
import axiosInstance from "~/api"

const initialValues = {
    email: "",
}

const validationSchema = Yup.object({
    email: Yup.string().email("*Định dạng email không chính xác").required("*Bắt buộc"),
})

const ForgotPassword = () => {
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState()
    const dispatch = useDispatch()

    return (
        <Styled>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, props) => {
                    setPending(true)
                    setTimeout(async () => {
                        const response = await axiosInstance("post", "/auth/getCode", { email: values.email })
                        setPending(false)

                        if (response.data.err === 0) {
                            dispatch(openVerifyCode(response.data.email))
                        } else {
                            setError(response.data.msg)
                        }
                    }, 1000)
                }}
            >
                {(props) => (
                    <Form>
                        <Title>Xác nhận email</Title>

                        <Field
                            as={TextField}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: "15px" }}
                            id="email"
                            name="email"
                            type="email"
                            helperText={<ErrorMessage name="email" />}
                        />

                        {error && (
                            <Alert severity="error" sx={{ marginTop: 1 }}>
                                {error}
                            </Alert>
                        )}

                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{
                                margin: "15px 0",
                                height: "50px",
                            }}
                        >
                            {isPending ? <CircularProgress size={30} color="inherit" /> : "Gửi"}
                        </Button>

                        <LinkBackToLogin />
                    </Form>
                )}
            </Formik>
        </Styled>
    )
}

export default ForgotPassword

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
