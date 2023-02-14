import "./newUser.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function NewUser() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        gender: "",
        role: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "*Tối đa 15 ký tự")
          .required("*Bắt buộc"),
        lastName: Yup.string()
          .max(20, "*Tối đa 20 ký tự")
          .required("*Bắt buộc"),
        email: Yup.string()
          .email("*Định dạng email không chính xác")
          .required("*Bắt buộc"),
        password: Yup.string().min(6).required("*Bắt buộc"),
        phoneNumber: Yup.string().matches(
          phoneRegExp,
          "*Đinh dạng số điện thoại không chính xác"
        ),
        address: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <div className="newUser">
        <h1 className="newUserTitle">Người dùng mới</h1>
        <Form className="newUserForm">
          <div className="newUserItem">
            <label>Họ</label>
            <Field name="firstName" type="text" placeholder="Họ" />
            <div className="errorMessage">
              <ErrorMessage name="firstName" />
            </div>
          </div>
          <div className="newUserItem">
            <label>Tên</label>
            <Field name="lastName" type="text" placeholder="Tên" />
            <div className="errorMessage">
              <ErrorMessage name="lastName" />
            </div>
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <Field name="email" type="email" placeholder="email@gmail.com" />
            <div className="errorMessage">
              <ErrorMessage name="email" />
            </div>
          </div>
          <div className="newUserItem">
            <label>Mật khẩu</label>
            <Field name="password" type="text" placeholder="Mật khẩu" />
            <div className="errorMessage">
              <ErrorMessage name="password" />
            </div>
          </div>
          <div className="newUserItem">
            <label>Số điện thoại</label>
            <Field name="phoneNumber" type="text" placeholder="+1 123 456 78" />
            <div className="errorMessage">
              <ErrorMessage name="phoneNumber" />
            </div>
          </div>
          <div className="newUserItem">
            <label>Địa chỉ</label>
            <Field name="address" type="text" placeholder="Vietnam | VN" />
            <div className="">
              <ErrorMessage name="address" />
            </div>
          </div>
          <div className="newUserItem">
            <label>Giới tính</label>
            <div className="newUserGender">
              <Field type="radio" name="gender" id="male" value="male" />
              <label for="male">Nam</label>
              <Field type="radio" name="gender" id="female" value="female" />
              <label for="female">Nữ</label>
            </div>
          </div>
          <div className="newUserItem">
            <label>Phân quyền</label>
            <Field as="select" className="newUserSelect" name="role" id="role">
              <option value="r1" >
                User
              </option>
              <option value="r2" selected>Admin</option>
            </Field>
          </div>
          <button type="submit" className="newUserButton">
            Create
          </button>
        </Form>
      </div>
    </Formik>
  );
}
