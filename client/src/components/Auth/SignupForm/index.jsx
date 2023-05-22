import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Link,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { showLoginForm } from "~/redux/ModalContainer/ModalContainerAction";
import { refreshPage } from "~/utils";
import axiosInstance from "~/utils/axiosInstance";

const Styled = styled(Box)(() => ({
  width: 400,

  "& .MuiFormHelperText-root": {
    color: "red",
  },
}));

const Title = styled(Box)(() => ({
  fontSize: "1.6rem",
  fontWeight: "500",
  textAlign: "center",
  marginBottom: "20px",
}));

const LinkBackToLogin = () => {
  const dispatch = useDispatch();

  return (
    <Box textAlign="center">
      <Link
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 3,
        }}
        onClick={() => dispatch(showLoginForm())}
      >
        <ArrowBackIcon fontSize="small" />
        <Typography>Trở về đăng nhập</Typography>
      </Link>
    </Box>
  );
};

const SignUpForm = () => {
  const [error, setError] = React.useState(null);
  const [isSubmitting, setSubmitting] = React.useState(false);

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
          firstName: Yup.string()
            .max(15, "*Tối đa 15 ký tự")
            .required("*Bắt buộc"),
          middleName: Yup.string()
            .max(15, "*Tối đa 15 ký tự")
            .required("*Bắt buộc"),
          lastName: Yup.string()
            .max(20, "Tối đa 20 ký tự")
            .required("*Bắt buộc"),
          email: Yup.string()
            .email("*Định dạng email không chính xác")
            .required("*Bắt buộc"),
          password: Yup.string().min(6).required("*Bắt buộc"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "*Mật khẩu không trùng khớp")
            .required("*Bắt buộc"),
        })}
        onSubmit={(values, props) => {
          setSubmitting(true);
          // destructuring - loại property 'confirmPassword'
          const { firstName, middleName, lastName, email, password } = values;

          // return console.log('values', values)

          setTimeout(async () => {
            // get data from DB
            const response = await axiosInstance({
              method: "post",
              url: "/client/auth/register",
              data: { firstName, middleName, lastName, email, password },
            });

            setSubmitting(false);

            if (response.data.err !== 0) {
              // Đăng ký thất bại
              setError(response.data.msg);

              // setSubmitting(false); // submit xong mở khóa
            } else {
              // Đăng ký thành công, lưu token vào LocalStorage
              localStorage.setItem("access_token", response.data.access_token);

              refreshPage();
            }
          }, 2000);
        }}
      >
        {(props) => (
          <Form>
            <Title>Đăng ký</Title>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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

            {error && (
              <Alert severity="error" sx={{ marginTop: 1 }}>
                {error}
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
              {isSubmitting ? <CircularProgress color="inherit" /> : "Đăng ký"}
            </Button>

            <LinkBackToLogin />
          </Form>
        )}
      </Formik>
    </Styled>
  );
};

export default SignUpForm;
