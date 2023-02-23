import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { Button, Grid, TextField } from "@mui/material";
import removeEmpty from "~/helper/removeEmpty";
import Notification from "~/components/Notification";
import RadioGender from "~/components/RadioGender";
import StatusAccount from "~/components/StatusAccount";
import SelectRole from "~/components/SelectRole";
import UploadAvatar from "./UploadAvatar";

const UserUpdate = () => {
  const [data, setData] = React.useState({ err: "", msg: "", data: "" });
  const [isSubmitting, setSubmitting] = React.useState(false);
  const userId = useParams().userId;
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onSubmit = (values, props) => {
    const data = removeEmpty(values);

    setSubmitting(true);

    setTimeout(async () => {
      const response = await axios({
        method: "put",
        url: `/admin/user/${userId}`,
        data: data,
      });

      // Set data phản hồi
      setData(response.data);

      // Nếu tạo thành công thì reset form
      if (response.data.err === 0) return props.resetForm();
    }, 2000);

    setSubmitting(false);
  };

  return (
    <div className="userUpdate">
      <span className="userUpdateTitle">Edit</span>

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
                    <MobileDatePicker
                      label="Ngày sinh"
                      inputFormat="DD/MM/YYYY"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => (
                        <Field
                          as={TextField}
                          id="dateOfBirth"
                          name="dateOfBirth"
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
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
                <UploadAvatar />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  sx={styleButtonSubmit}
                >
                  Update
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
