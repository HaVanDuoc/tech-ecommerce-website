import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import React, { useEffect } from "react"
import { Box, FormHelperText, TextField } from "@mui/material"
import Notification from "~/components/Notification"
import { AdminTitle, FieldForm } from "~/admin/Styled"
import Gender from "./components/Gender"
import Role from "./components/Role"
import removeEmpty from "~/helper/removeEmpty"
import DateOfBirth from "~/admin/components/DateOfBirth"
import ButtonSubmit from "~/admin/components/ButtonSubmit"
import axiosInstance, { requestGenderUser } from "~/api"
import { requestRolesUser } from "~/api"
import { useDispatch, useSelector } from "react-redux"
import { selectorUser } from "~/redux/userSlice"

export default function CreateUser() {
    const [data, setData] = React.useState({ err: "", msg: "", data: "" })
    const [isSubmitting, setSubmitting] = React.useState(false)
    const dispatch = useDispatch()

    const fetch = useSelector(selectorUser)

    useEffect(() => {
        if (!fetch?.roles.length) requestRolesUser(dispatch)
        if (!fetch?.gender.length) requestGenderUser(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, props) => {
                const data = removeEmpty(values) // Exclude filed data blank

                // return alert(JSON.stringify(data, null, 2)) // Test submit

                setSubmitting(true)

                setTimeout(async () => {
                    const response = await axiosInstance("post", "/user/createUser", data)
                    setData(response.data)
                    setSubmitting(false)
                    if (response.data.err === 0) return props.resetForm()
                }, 2000)
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
                                    <Field as={item.as} label={item.label} name={item.name} type={item.type} />
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
    )
}

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

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
}

const validationSchema = Yup.object({
    firstName: Yup.string().max(15, "*Tối đa 15 ký tự").required("*Bắt buộc"),
    middleName: Yup.string().max(15, "*Tối đa 15 ký tự"),
    lastName: Yup.string().max(20, "*Tối đa 20 ký tự").required("*Bắt buộc"),
    email: Yup.string().email("*Định dạng email không chính xác").required("*Bắt buộc"),
    password: Yup.string().min(6, "Mật khẩu phải có tối thiểu 6 ký tự").required("*Bắt buộc"),
    phoneNumber: Yup.string().matches(phoneRegExp, "*Đinh dạng số điện thoại không chính xác"),
    address: Yup.string(),
    birthday: Yup.string(),
    role: Yup.string().required("*Bắt buộc"),
    gender: Yup.string().required("*Bắt buộc"),
})

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
]
