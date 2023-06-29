import { Alert, Box, Button, Checkbox, CircularProgress, Link, styled, TextField, Typography } from "@mui/material"
import { openSignIn, selectorStatusRegister } from "~/redux/authSlice"
import { ErrorMessage, Field, Form, Formik } from "formik"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useDispatch, useSelector } from "react-redux"
import { requestRegister } from "~/api"
import * as Yup from "yup"
import React from "react"
import removeEmpty from "~/helper/removeEmpty"

const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const validationSchema = Yup.object({
    firstName: Yup.string().max(15, "*Tối đa 15 ký tự").required("*Bắt buộc"),
    middleName: Yup.string().max(15, "*Tối đa 15 ký tự"),
    lastName: Yup.string().max(20, "Tối đa 20 ký tự").required("*Bắt buộc"),
    email: Yup.string().email("*Định dạng email không chính xác").required("*Bắt buộc"),
    password: Yup.string().min(6).required("*Bắt buộc"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "*Mật khẩu không trùng khớp")
        .required("*Bắt buộc"),
})

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const stateRegister = useSelector(selectorStatusRegister)

    return (
        <Styled>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, props) => {}}>
                {(props) => (
                    <Form>
                        <Title>Thay đổi mật khẩu</Title>

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

                        {stateRegister.error && (
                            <Alert severity="error" sx={{ marginTop: 1 }}>
                                {stateRegister.error}
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
                            {stateRegister.isPending ? <CircularProgress color="inherit" /> : "Đăng ký"}
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
