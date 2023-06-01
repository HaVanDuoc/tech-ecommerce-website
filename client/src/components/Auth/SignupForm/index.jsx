import { Alert, Box, Button, Checkbox, CircularProgress, Link, styled, TextField, Typography } from "@mui/material"
import { modalLoginForm, selectorStatusRegister } from "~/redux/authSlice"
import { ErrorMessage, Field, Form, Formik } from "formik"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useDispatch, useSelector } from "react-redux"
import { requestRegister } from "~/api"
import * as Yup from "yup"
import React from "react"

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
                onClick={() => dispatch(modalLoginForm())}
            >
                <ArrowBackIcon fontSize="small" />
                <Typography>Trở về đăng nhập</Typography>
            </Link>
        </Box>
    )
}

const SignUpForm = () => {
    const dispatch = useDispatch()
    const stateRegister = useSelector(selectorStatusRegister)

    return (
        <Styled>
            <Formik
                initialValues={{
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().max(15, "*Tối đa 15 ký tự").required("*Bắt buộc"),
                    middleName: Yup.string().max(15, "*Tối đa 15 ký tự").required("*Bắt buộc"),
                    lastName: Yup.string().max(20, "Tối đa 20 ký tự").required("*Bắt buộc"),
                    email: Yup.string().email("*Định dạng email không chính xác").required("*Bắt buộc"),
                    password: Yup.string().min(6).required("*Bắt buộc"),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref("password"), null], "*Mật khẩu không trùng khớp")
                        .required("*Bắt buộc"),
                })}
                onSubmit={(values, props) => requestRegister(dispatch, values)}
            >
                {(props) => (
                    <Form>
                        <Title>Đăng ký</Title>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Field
                                as={TextField}
                                label="Họ"
                                variant="outlined"
                                sx={{ marginBottom: "15px", width: "30%" }}
                                id="firstName"
                                name="firstName"
                                type="text"
                                helperText={<ErrorMessage name="firstName" />}
                            />

                            <Field
                                as={TextField}
                                label="Tên đệm"
                                variant="outlined"
                                sx={{ marginBottom: "15px", width: "30%" }}
                                id="middleName"
                                name="middleName"
                                type="text"
                                helperText={<ErrorMessage name="middleName" />}
                            />

                            <Field
                                as={TextField}
                                label="Tên"
                                variant="outlined"
                                sx={{ marginBottom: "15px", width: "30%" }}
                                id="lastName"
                                name="lastName"
                                type="text"
                                helperText={<ErrorMessage name="lastName" />}
                            />
                        </Box>

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

                        <Field
                            as={TextField}
                            label="Mật khẩu"
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
                            label="Xác nhận mật khẩu"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: "15px" }}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            helperText={<ErrorMessage name="confirmPassword" />}
                        />

                        {stateRegister.error && (
                            <Alert severity="error" sx={{ marginTop: 1 }}>
                                {stateRegister.error}
                            </Alert>
                        )}

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                margin: "10px 0",
                                fontSize: 13,
                                color: "#666",
                                "& .MuiSvgIcon-root": { fontSize: 17 },
                                "& .MuiLink-root": { textDecoration: "none" },
                            }}
                        >
                            <Checkbox name="eula" defaultChecked />
                            <Box component="span">
                                Đã đọc và đồng ý <Link href="#">Điều khoản dịch vụ</Link> &{" "}
                                <Link href="#">Chính Sách Về Quyền Riêng Tư</Link>
                            </Box>
                        </Box>

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

export default SignUpForm
