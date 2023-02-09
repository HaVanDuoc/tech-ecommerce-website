import { Box, Button, styled, TextField } from "@mui/material";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Styled = styled(Box)(() => ({
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
//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().max(15, "*Tối đa 15 ký tự").required("*Bắt buộc"),
//       lastName: Yup.string().max(20, "Tối đa 20 ký tự").required("*Bắt buộc"),
//       email: Yup.string()
//         .email("*Định dạng email không chính xác")
//         .required("*Bắt buộc"),
//       password: Yup.string().min(6).required("*Bắt buộc"),
//       confirmPassword: Yup.string().oneOf(
//         [Yup.ref("password"), null],
//         "*Mật khẩu không trùng khớp"
//       ),
//     }),
//     onSubmit: (values, { setSubmitting }) => {
//       setTimeout(() => {
//         alert(JSON.stringify(values, null, 2));
//         setSubmitting(false);
//       }, 400);
//     },
//   });

//   return (
//     <FormSignUp>
//       <Title>Đăng ký</Title>

//       {/* form */}
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           label="Họ"
//           variant="outlined"
//           fullWidth
//           sx={{ marginBottom: "15px" }}
//           id="firstName"
//           name="firstName"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.firstName}
//         />
//         {formik.touched.firstName && formik.errors.firstName ? (
//           <div>{formik.errors.firstName}</div>
//         ) : null}

//         <TextField
//           label="Tên"
//           variant="outlined"
//           fullWidth
//           sx={{ marginBottom: "15px" }}
//           id="lastName"
//           name="lastName"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.lastName}
//         />
//         {formik.touched.lastName && formik.errors.lastName ? (
//           <div>{formik.errors.lastName}</div>
//         ) : null}

//         <TextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           sx={{ marginBottom: "15px" }}
//           id="email"
//           name="email"
//           type="email"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.email}
//         />
//         {formik.touched.email && formik.errors.email ? (
//           <div>{formik.errors.email}</div>
//         ) : null}

//         <TextField
//           label="Mật khẩu"
//           variant="outlined"
//           fullWidth
//           sx={{ marginBottom: "15px" }}
//           id="password"
//           name="password"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.password}
//         />
//         {formik.touched.password && formik.errors.password ? (
//           <div>{formik.errors.password}</div>
//         ) : null}

//         <TextField
//           label="Nhập lại mật khẩu"
//           variant="outlined"
//           fullWidth
//           sx={{ marginBottom: "15px" }}
//           id="confirmPassword"
//           name="confirmPassword"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.confirmPassword}
//         />
//         {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
//           <div>{formik.errors.confirmPassword}</div>
//         ) : null}

//         <ButtonSubmit>Đăng ký</ButtonSubmit>
//       </form>
//     </FormSignUp>
//   );
// };

const SignUpForm = () => {
  return (
    <Styled>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
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
          setTimeout(() => {
            props.setSubmitting(false);
            props.resetForm(true);
          }, 1500);
        }}
      >
        {(props) => (
          <Form>
            <Title>Đăng ký</Title>
            <Field
              as={TextField}
              label="Họ"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "15px" }}
              id="firstName"
              name="firstName"
              type="text"
              helperText={<ErrorMessage name="firstName" />}
            />

            <Field
              as={TextField}
              label="Tên"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "15px" }}
              id="lastName"
              name="lastName"
              type="text"
              helperText={<ErrorMessage name="lastName" />}
            />

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
              Đăng ký
            </Button>
          </Form>
        )}
      </Formik>
    </Styled>
  );
};

export default SignUpForm;
