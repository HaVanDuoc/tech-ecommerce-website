import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { Box, FormHelperText } from "@mui/material";
import Notification from "~/components/Notification";
import { AdminTitle, FieldForm } from "~/admin/Styled";
import Gender from "./components/Gender";
import Role from "./components/Role";
import removeEmpty from "~/helper/removeEmpty";
import DateOfBirth from "~/admin/components/DateOfBirth";
import ButtonSubmit from "~/admin/components/ButtonSubmit";
import { fields } from "./components/array";
import axiosInstance from "~/utils/axiosInstance";

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
  birthday: "",
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
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "*Đinh dạng số điện thoại không chính xác")
    .required("*Bắt buộc"),
  address: Yup.string().required("*Bắt buộc"),
  birthday: Yup.string().required("*Bắt buộc"),
  role: Yup.string().required("*Bắt buộc"),
  gender: Yup.string().required("*Bắt buộc"),
});

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
          const response = await axiosInstance({
            method: "post",
            url: "/admin/users/newUser",
            headers: {
              Authorization: localStorage.getItem("access_token"),
            },
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
        <Box sx={{ flex: 4, paddingLeft: 4, paddingRight: 4 }}>
          <AdminTitle>Người dùng mới</AdminTitle>

          <Notification data={data} />

          <Form style={{ display: "flex", flexWrap: "wrap" }}>
            {Array.isArray(fields) &&
              fields.map((item, index) => (
                <FieldForm key={index}>
                  <Field
                    as={item.as}
                    label={item.label}
                    name={item.name}
                    type={item.type}
                  />
                  <FormHelperText>
                    <ErrorMessage name={item.name} />
                  </FormHelperText>
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
              <ButtonSubmit disabled={isSubmitting}>Tạo</ButtonSubmit>
            </FieldForm>
          </Form>
        </Box>
      )}
    </Formik>
  );
}
