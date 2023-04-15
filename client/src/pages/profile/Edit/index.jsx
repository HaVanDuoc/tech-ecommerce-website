import {
  Avatar,
  Box,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { Background, HeaderProfile } from "..";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/AuthCurrentUser/reducer";
import { PF } from "~/__variables";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Edit = () => {
  const currentUser = useSelector(selectorCurrentUser);

  return (
    <Box>
      <Background />
      <HeaderProfile />
      <SectionEdit currentUser={currentUser} />
    </Box>
  );
};

export default Edit;

const SectionEdit = ({ currentUser }) => {
  return (
    <Box sx={{ position: "relative", top: -100 }}>
      <Container maxWidth="lg" disableGutters>
        <Stack
          sx={{
            backgroundColor: "#fff",
            flexDirection: "column",
            boxShadow: "0 0 1px 1px rgba(0,0,0,0.25)",
            borderRadius: "15px",
          }}
        >
          <Box sx={{ padding: "15px 24px" }}>
            <Typography fontWeight={500}>
              Hoàn thiện thông tin cá nhân
            </Typography>
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box sx={{ position: "relative", margin: 4 }}>
              <Avatar
                src={currentUser.isLogged && currentUser.user.data.avatar}
                sx={{ width: 120, height: 120 }}
              />
              <Avatar
                src={PF + "/assets/profile/cover-avatar.png"}
                sx={{
                  width: 140,
                  height: 140,
                  position: "absolute",
                  top: -10,
                  left: -10,
                }}
              />
            </Box>

            <Stack
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                sx={{
                  backgroundColor: "#f1f4f9",
                  padding: "3px 20px",
                  margin: "0 10px",
                  cursor: "pointer",
                  borderRadius: "15px",
                  boxShadow: "0 0 1px 1px rgba(0,0,0,0.08)",
                }}
              >
                <Typography fontSize={14} color="#555">
                  Đổi ảnh đại diện
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#f1f4f9",
                  padding: "3px 20px",
                  margin: "0 10px",
                  cursor: "pointer",
                  borderRadius: "15px",
                  boxShadow: "0 0 1px 1px rgba(0,0,0,0.08)",
                }}
              >
                <Typography fontSize={14} color="#555">
                  Thay đổi hình nền
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#f1f4f9",
                  padding: "3px 20px",
                  margin: "0 10px",
                  cursor: "pointer",
                  borderRadius: "15px",
                  boxShadow: "0 0 1px 1px rgba(0,0,0,0.08)",
                }}
              >
                <Typography fontSize={14} color="#555">
                  Sửa khung đại diện
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Container maxWidth="md">
            <Box sx={{ padding: "30px 0" }}>
              <FormEdit />
            </Box>
          </Container>
        </Stack>
      </Container>
    </Box>
  );
};

const FormEdit = () => {
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().max(15, "*Tối đa 15 ký tự"),
    middleName: Yup.string().max(15, "*Tối đa 15 ký tự"),
    lastName: Yup.string().max(20, "Tối đa 20 ký tự"),
    dateOfBirth: Yup.string(),
    gender: Yup.string(),
    phoneNumber: Yup.string().max(10, "Tối đa 10 ký tự"),
    address: Yup.string().max(100, "Tối đa 100 ký tự"),
  });

  const onSubmit = (values, props) => {};

  const Styled = styled(Box)(() => ({
    ".field": {
      margin: 1,
    },
  }));

  return (
    <Styled>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <Stack flexDirection="row">
              <Field
                as={TextField}
                label="Họ"
                variant="outlined"
                name="firstName"
                type="text"
                fullWidth
                helperText={<ErrorMessage name="firstName" />}
                style={{ margin: "10px" }}
              />
              <Field
                as={TextField}
                label="Tên lót"
                variant="outlined"
                name="middleName"
                type="text"
                fullWidth
                helperText={<ErrorMessage name="middleName" />}
                style={{ margin: "10px" }}
              />
              <Field
                as={TextField}
                label="Tên"
                variant="outlined"
                name="lastName"
                type="text"
                fullWidth
                helperText={<ErrorMessage name="lastName" />}
                style={{ margin: "10px" }}
              />
            </Stack>
          </Form>
        )}
      </Formik>
    </Styled>
  );
};
