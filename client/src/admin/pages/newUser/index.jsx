import "./newUser.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Notification from "~/components/Notification";
import { AdminTitle, CatchError, FieldForm } from "~/admin/Styled";
import Gender from "./components/Gender";
import Role from "./components/Role";
import removeEmpty from "~/helper/removeEmpty";
import DateOfBirth from "~/admin/components/DateOfBirth";
import ButtonSubmit from "~/admin/components/ButtonSubmit";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  address: "",
  gender: "",
  role: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().max(15, "*Tối đa 15 ký tự").required("*Bắt buộc"),
  middleName: Yup.string().max(15, "*Tối đa 15 ký tự"),
  lastName: Yup.string().max(20, "*Tối đa 20 ký tự").required("*Bắt buộc"),
  email: Yup.string()
    .email("*Định dạng email không chính xác")
    .required("*Bắt buộc"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có tối thiểu 6 ký tự")
    .required("*Bắt buộc"),
  phoneNumber: Yup.string().matches(
    phoneRegExp,
    "*Đinh dạng số điện thoại không chính xác"
  ),
  address: Yup.string(),
  birthday: Yup.string().required("*Bắt buộc"),
  role: Yup.string().required("*Bắt buộc"),
});

const fields = [
  {
    label: "Họ",
    as: TextField,
    name: "firstName",
    type: "text",
  },
  {
    label: "Tên đệm",
    as: TextField,
    name: "middleName",
    type: "text",
  },
  {
    label: "Tên",
    as: TextField,
    name: "lastName",
    type: "text",
  },
  {
    label: "Email",
    as: TextField,
    name: "email",
    type: "text",
  },
  {
    label: "Mật khẩu",
    as: TextField,
    name: "password",
    type: "text",
  },
  {
    label: "Số điện thoại",
    as: TextField,
    name: "phoneNumber",
    type: "text",
  },
  {
    label: "Địa chỉ",
    as: TextField,
    name: "address",
    type: "text",
  },
];

export default function NewUser() {
  const [data, setData] = React.useState({ err: "", msg: "", data: "" });
  const [isSubmitting, setSubmitting] = React.useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, props) => {
        const data = removeEmpty(values); // Exclude filed data blank

        // return alert(JSON.stringify(data, null, 2)); // Test submit

        setSubmitting(true); // click submit khóa liền

        setTimeout(async () => {
          // get data from DB
          const response = await axios({
            method: "post",
            url: "/admin/user/newUser",
            data: data,
          });

          setData(response.data);

          setSubmitting(false); // click submit khóa liền

          // Nếu tạo thành công thì reset form
          if (response.data.err === 0) return props.resetForm();
        }, 2000);
      }}
    >
      {(props) => (
        <div className="newUser">
          <AdminTitle>Người dùng mới</AdminTitle>

          <Notification data={data} />

          <Form className="newUserForm">
            {Array.isArray(fields) &&
              fields.map((item, index) => (
                <FieldForm key={index}>
                  <Field
                    as={item.as}
                    label={item.label}
                    name={item.name}
                    type={item.type}
                  />
                  <CatchError>
                    <ErrorMessage name={item.name} />
                  </CatchError>
                </FieldForm>
              ))}

            <FieldForm>
              <DateOfBirth props={props} />
            </FieldForm>

            <FieldForm>
              <Gender />
            </FieldForm>

            <FieldForm>
              <Role props={props} />
            </FieldForm>

            <FieldForm>
              <ButtonSubmit disabled={isSubmitting}>Create</ButtonSubmit>
              {/* <Button
                type="submit"
                disabled={isSubmitting}
                sx={{
                  width: 200,
                  border: "2px solid transparent",
                  borderRadius: 3,
                  backgroundColor: "darkblue",
                  color: "white",
                  padding: "7px 10px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all .4s ease",

                  "&:hover": {
                    border: "2px solid darkblue",
                    color: "darkblue !important",
                  },
                }}
              >
                Create
              </Button> */}
            </FieldForm>
          </Form>
        </div>
      )}
    </Formik>
  );
}
