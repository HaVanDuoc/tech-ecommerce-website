import { Box, FormHelperText, Grid, TextField } from "@mui/material"
import React, { useState } from "react"
import { AdminTitle, FieldForm } from "~/admin/Styled"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import removeEmpty from "~/helper/removeEmpty"
import ButtonSubmit from "~/admin/components/ButtonSubmit"
import { useSnackbar } from "notistack"
import axiosInstance from "~/utils/axiosInstance"
import refreshPage from "~/utils/refreshPage"

const categories = [
    {
        as: TextField,
        label: "Tên thương hiêu",
        type: "text",
        name: "name",
    },
    {
        as: TextField,
        label: "Link truy cập tới",
        type: "text",
        name: "link",
    },
]

const initialValues = {
    name: "",
    link: "",
    logo: "",
}

const validationSchema = Yup.object({
    name: Yup.string().required("*Bắt buộc"),
    link: Yup.string(),
    logo: Yup.mixed(),
})

const NewBrand = () => {
    const [logo, setLogo] = useState(null)
    const [isSubmitting, setSubmitting] = React.useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const handleSnackBar = (res) => {
        if (res.data.err === 0) {
            enqueueSnackbar(res.data.msg, {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "center" },
                autoHideDuration: 4000,
            })
        } else {
            enqueueSnackbar(res.data.msg, {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" },
                autoHideDuration: 4000,
            })
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, props) => {
                var data = removeEmpty(values)

                // return alert(JSON.stringify(data, null, 2)); // Test submit

                setSubmitting(true)

                setTimeout(async () => {
                    // get data from DB
                    const response = await axiosInstance({
                        method: "post",
                        url: "/admin/display/brand/newBrand",
                        data: data,
                    })

                    setSubmitting(false)

                    handleSnackBar(response)

                    // Nếu tạo thành công thì reset form
                    if (response.data.err === 0) return refreshPage()
                }, 2000)
            }}
        >
            {(props) => (
                <Form method="post" encType="multipart/form-data">
                    <Box sx={{ flex: 4, paddingLeft: 4, paddingRight: 4 }}>
                        <AdminTitle>Thương hiệu mới</AdminTitle>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                {Array.isArray(categories) &&
                                    categories.map((item, index) => (
                                        <FieldForm key={index}>
                                            <Field as={item.as} label={item.label} name={item.name} type={item.type} />
                                            <FormHelperText>
                                                <ErrorMessage name={item.name} />
                                            </FormHelperText>
                                        </FieldForm>
                                    ))}

                                <FieldForm>
                                    <TextField
                                        name="image"
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={(e) => {
                                            let reader = new FileReader()
                                            let file = e.target.files[0]
                                            reader.readAsDataURL(file)

                                            if (file) {
                                                reader.onload = (e) => {
                                                    setLogo({
                                                        file: e.target.result,
                                                        imagePreviewUrl: e.target.result,
                                                    })
                                                    props.setFieldValue("logo", e.target.result) // return file name
                                                }
                                            }
                                        }}
                                    />
                                    {logo && <img src={logo.imagePreviewUrl} alt="" />}
                                    <FormHelperText>
                                        <ErrorMessage name="logo" />
                                    </FormHelperText>
                                </FieldForm>

                                <FieldForm>
                                    <ButtonSubmit disabled={isSubmitting}>Create</ButtonSubmit>
                                </FieldForm>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default NewBrand
