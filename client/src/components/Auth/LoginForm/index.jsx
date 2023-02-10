import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { showSignUpForm } from "~/redux/ModalContainer/ModalContainerAction";

const Styled = styled(Box)(() => ({
  width: 400,

  "& .MuiFormHelperText-root": {
    color: "red",
  },
}));

const Title = styled(Box)(() => ({
  fontSize: "1.3rem",
  fontWeight: "500",
  textAlign: "center",
  marginBottom: "20px",
}));

const LinkForgotPassword = ({ children }) => {
  return (
    <Box textAlign="right">
      <Link>{children}</Link>
    </Box>
  );
};

const LinkSignUp = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <Box textAlign="center">
      Bạn chưa có tài khoản?{" "}
      <Link onClick={() => dispatch(showSignUpForm())}>{children}</Link>
    </Box>
  );
};

const MethodLoginOther = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Divider textAlign="center">
          <Chip
            label="Hoặc"
            sx={{
              fontSize: "0.9rem",
              fontStyle: "italic",
              color: "var(--color-text)",
              margin: "10px 0",
            }}
          />
        </Divider>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Button
          size="large"
          variant="outlined"
          fullWidth
          sx={{ height: "50px", margin: "10px 0" }}
        >
          <GoogleIcon color="red" />
          <Typography
            sx={{
              textTransform: "none",
              marginLeft: "10px",
              color: "var(--color-text)",
            }}
          >
            Đăng nhập với Google
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

const LoginForm = () => {
  return (
    <Styled>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("*Định dạng email không chính xác")
            .required("*Bắt buộc"),
          password: Yup.string().min(6).required("*Bắt buộc"),
        })}
        onSubmit={(values, props) => {
          setTimeout(() => {
            props.setSubmitting(false);
            props.resetForm(true);
          }, 1500);
        }}
      >
        {(props) => (
          <Form>
            <Title>Đăng nhập</Title>

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

            <LinkForgotPassword>Quên mật khẩu?</LinkForgotPassword>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                margin: "15px 0",
                height: "50px",
                borderRadius: "var(--border-radius)",
              }}
              disabled={props.isSubmitting}
            >
              Đăng nhập
            </Button>

            <LinkSignUp>Đăng ký ngay</LinkSignUp>

            <MethodLoginOther />
          </Form>
        )}
      </Formik>
    </Styled>
  );
};

export default LoginForm;
