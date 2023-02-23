import "./user.css";
import React from "react";
import { Avatar, Button, Grid, TextField } from "@mui/material";
import { FetchUser } from "~/helper/fetch";
import { Link, useParams } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PublishIcon from "@mui/icons-material/Publish";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import formatPhoneNumber from "~/helper/formatPhoneNumber";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import RadioGender from "~/components/RadioGender";
import removeEmpty from "~/helper/removeEmpty";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import SelectRole from "~/components/SelectRole";
import axios from "axios";
import Notification from "~/components/Notification";
import StatusAccount from "~/components/StatusAccount";

export default function User() {
  const [user, setUser] = React.useState({});

  // Lấy UID từ url hiện tại
  const userId = useParams().userId;

  // Fetch thông tin user
  const response = FetchUser(userId);
  React.useEffect(() => {
    setUser(response);
  }, [response]);

  const {
    firstName,
    middleName,
    lastName,
    avatar,
    userName,
    role,
    transactionVolume,
    dateOfBirth,
    phoneNumber,
    email,
    address,
    status,
  } = user;

  // FullName
  const fullName =
    (firstName || "") + " " + (middleName || "") + " " + (lastName || "");

  const AccountDetails = [
    { value: userName, icon: <PermIdentityIcon className="userShowIcon" /> },
    { value: dateOfBirth, icon: <CakeOutlinedIcon className="userShowIcon" /> },
    {
      value: transactionVolume,
      icon: <AttachMoneyIcon className="userShowIcon" />,
    },
    { value: status, icon: <TaskAltOutlinedIcon className="userShowIcon" /> },
    { value: role, icon: <WorkspacePremiumIcon className="userShowIcon" /> },
  ];

  const ContactDetails = [
    {
      value: formatPhoneNumber(phoneNumber),
      icon: <PhoneIphoneOutlinedIcon className="userShowIcon" />,
    },
    {
      value: email,
      icon: <EmailOutlinedIcon className="userShowIcon" />,
    },
    {
      value: address,
      icon: <LocationOnOutlinedIcon className="userShowIcon" />,
    },
  ];

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Cập nhật thông tin</h1>
        <Link to="/admin/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        {/* Left Side Information */}
        <div className="userShow">
          <div className="userShowTop">
            <Avatar alt="avatar" src={avatar} />

            <div className="userShowTopTitle">
              <span className="userShowUsername">{fullName}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            {/* Account Details */}
            <span className="userShowTitle">Account Details</span>
            {AccountDetails.map((item, index) => {
              return (
                item.value && (
                  <div className="userShowInfo" key={index}>
                    {item.icon}
                    <span className="userShowInfoTitle">{item.value}</span>
                  </div>
                )
              );
            })}

            {/* Contact Details */}
            <span className="userShowTitle">Contact Details</span>
            {ContactDetails.map((item, index) => {
              return (
                item.value && (
                  <div className="userShowInfo" key={index}>
                    {item.icon}
                    <span className="userShowInfoTitle">{item.value}</span>
                  </div>
                )
              );
            })}
          </div>
        </div>

        {/* Right Side Updating */}
        <UserUpdate />
      </div>
    </div>
  );
}

const UserUpdate = () => {
  const [data, setData] = React.useState({ err: "", msg: "", data: "" });
  const [isSubmitting, setSubmitting] = React.useState(false);
  const userId = useParams().userId;

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

  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
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
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <PublishIcon className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>

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
