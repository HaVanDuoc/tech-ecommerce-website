import React from "react";
import dayjs from "dayjs";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Button, Grid, TextField } from "@mui/material";
import removeEmpty from "~/helper/removeEmpty";
import Notification from "~/components/Notification";
import RadioGender from "~/components/RadioGender";
import StatusAccount from "~/components/StatusAccount";
import SelectRole from "~/components/SelectRole";
import UploadAvatar from "./UploadAvatar";
import axiosInstance from "~/utils/axiosInstance";

const UserUpdate = ({ fetch }) => {
  const { userId } = fetch;
  const [data, setData] = React.useState({ err: "", msg: "", data: "" });
  const [isSubmitting, setSubmitting] = React.useState(false); // Block button submit when its submitting
  const [value, setValue] = React.useState(dayjs(new Date())); // Date of birth

  // For UploadAvatar components

  const onSubmit = (values, props) => {
    const data = removeEmpty(values); // exclude prop blank

    // return alert(JSON.stringify(data));

    setSubmitting(true); // block button submit

    // handle update
    setTimeout(async () => {
      const response = await axiosInstance({
        method: "put",
        url: `/admin/users/${userId}`,
        headers: { Authorization: localStorage.getItem("access_token") },
        data: data,
      });

      setData(response.data);

      if (response.data.err === 0) return props.resetForm(); // if successful then reset form
    }, 2000);

    setSubmitting(false); // unlock button submit
  };

  return (
    <div className="userUpdate">
      <span className="userUpdateTitle">Chỉnh sửa</span>

      <Notification data={data} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form className="userUpdateForm">
            <Grid container spacing={2}>
              <Grid item container spacing={3} xs={9}>
                {UserUpdateItem.map((item, index) => (
                  <Grid item xs={item.xs} key={index}>
                    <Field
                      as={item.as}
                      label={item.label}
                      variant="standard"
                      id={item.identify}
                      name={item.identify}
                      type="text"
                      fullWidth
                      helperText={<ErrorMessage name={item.identify} />}
                    />
                  </Grid>
                ))}

                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Ngày sinh"
                      inputFormat="DD/MM/YYYY"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                        props.setFieldValue("dateOfBirth", newValue);
                      }}
                      renderInput={(params) => {
                        return (
                          <Field
                            as={TextField}
                            name="dateOfBirth"
                            {...params}
                          />
                        );
                      }}
                    />
                  </LocalizationProvider>

                  {/* <DateOfBirth props={props} /> */}
                </Grid>

                <Grid item xs={6}>
                  <RadioGender />
                </Grid>

                <Grid item xs={6}>
                  <StatusAccount />
                </Grid>

                <Grid item xs={6}>
                  <SelectRole />
                </Grid>
              </Grid>

              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <UploadAvatar props={props} />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  sx={styleButtonSubmit}
                >
                  Cập nhật
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const validationSchema = Yup.object({
  firstName: Yup.string().max(15, "*Tối đa 15 ký tự"),
  middleName: Yup.string().max(15, "*Tối đa 15 ký tự"),
  lastName: Yup.string().max(20, "Tối đa 20 ký tự"),
  email: Yup.string().email("*Định dạng email không chính xác"),
  password: Yup.string().min(6),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "*Mật khẩu không trùng khớp"
  ),
});

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  avatar: "",
  userName: "",
  roleId: "",
  transactionVolume: "",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  address: "",
  status: "",
};

const styleButtonSubmit = {
  borderRadius: "5px",
  border: "2px solid darkblue",
  padding: "5px",
  cursor: "pointer",
  backgroundColor: "darkblue",
  color: "white",
  fontWeight: 600,
  textTransform: "capitalize",
  transition: "all .3s ease",

  "&:hover": {
    backgroundColor: "white",
    color: "darkblue",
  },
};

const UserUpdateItem = [
  { as: TextField, label: "Họ", identify: "firstName", xs: 4 },
  { as: TextField, label: "Tên đệm", identify: "middleName", xs: 4 },
  { as: TextField, label: "Tên", identify: "lastName", xs: 4 },
  { as: TextField, label: "Email", identify: "email", xs: 6 },
  { as: TextField, label: "Mật khẩu", identify: "password", xs: 6 },
  { as: TextField, label: "Tên người dùng", identify: "userName", xs: 6 },
  { as: TextField, label: "Số điện thoại", identify: "phoneNumber", xs: 6 },
  { as: TextField, label: "Địa chỉ", identify: "address", xs: 6 },
];

export default UserUpdate;
