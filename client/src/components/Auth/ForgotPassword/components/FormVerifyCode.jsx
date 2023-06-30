import { Alert, Box, Button, CircularProgress, Link, styled, TextField, Typography } from "@mui/material"
import { openChangePassword, openSignIn, selectorModalLogin } from "~/redux/authSlice"
import { ErrorMessage, Field, Form, Formik } from "formik"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import React, { useState } from "react"
import axiosInstance from "~/api"

const initialValues = {
    code: "",
}

const validationSchema = Yup.object({
    code: Yup.string().required("*Bắt buộc"),
})

const FormVerifyCode = () => {
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const email = useSelector(selectorModalLogin)?.data

    return (
        <Styled>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, props) => {
                    setPending(true)
                    setTimeout(async () => {
                        const response = await axiosInstance("post", "/auth/verifyCode", {
                            email: email,
                            code: values.code,
                        })

                        setPending(false)

                        if (response.data.err === 0) {
                            dispatch(openChangePassword({ email }))
                        } else {
                            setError(response.data.msg)
                        }
                    }, 1500)
                }}
            >
                {(props) => (
                    <Form>
                        <Title>Xác nhận OTP</Title>

                        <Field
                            as={TextField}
                            label="Nhập mã xác nhận"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: "15px" }}
                            id="code"
                            name="code"
                            type="text"
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
                            {isPending ? <CircularProgress size={30} color="inherit" /> : "Xác nhận"}
                        </Button>

                        <LinkBackToLogin />
                    </Form>
                )}
            </Formik>
        </Styled>
    )
}

export default FormVerifyCode

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
