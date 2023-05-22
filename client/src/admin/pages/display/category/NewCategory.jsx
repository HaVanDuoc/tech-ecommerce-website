import { Box, FormHelperText, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { AdminTitle, FieldForm } from "~/admin/Styled";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import removeEmpty from "~/helper/removeEmpty";
import ButtonSubmit from "~/admin/components/ButtonSubmit";
import { useSnackbar } from "notistack";
import axiosInstance from "~/utils/axiosInstance";

const categories = [
  {
    as: TextField,
    label: "Tên danh mục",
    type: "text",
    name: "name",
  },
  {
    as: TextField,
    label: "Link truy cập tới",
    type: "text",
    name: "link",
  },
];

const initialValues = {
  name: "",
  link: "",
  image: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("*Bắt buộc"),
  link: Yup.string().required("*Bắt buộc"),
  image: Yup.mixed().required("*Bắt buộc"),
});

const NewCategory = () => {
  const [image, setImage] = useState(null);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSnackBar = (res) => {
    if (res.data.err === 0) {
      enqueueSnackbar(res.data.msg, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 4000,
      });
    } else {
      enqueueSnackbar(res.data.msg, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 4000,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, props) => {
        var data = removeEmpty(values)

        // return alert(JSON.stringify(data, null, 2)); // Test submit

        setSubmitting(true);

        setTimeout(async () => {
          // get data from DB
          const response = await axiosInstance({
            method: "post",
            url: "/admin/display/category/newCategory",
            data: data,
          });

          setSubmitting(false);

          handleSnackBar(response);

          // Nếu tạo thành công thì reset form
          if (response.data.err === 0) return props.resetForm();
        }, 2000);
      }}
    >
      {(props) => (
        <Form method="post" encType="multipart/form-data">
          <Box sx={{ flex: 4, paddingLeft: 4, paddingRight: 4 }}>
            <AdminTitle>Danh mục mới</AdminTitle>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                {Array.isArray(categories) &&
                  categories.map((item, index) => (
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
                  <TextField
                    name="image"
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      let reader = new FileReader();
                      let file = e.target.files[0];
                      reader.readAsDataURL(file);

                      if (file) {
                        reader.onload = (e) => {
                          setImage({
                            file: e.target.result,
                            imagePreviewUrl: e.target.result,
                          });
                          props.setFieldValue("image", e.target.result); // return file name
                        };
                      }
                    }}
                  />
                  {image && <img src={image.imagePreviewUrl} alt="" />}
                  <FormHelperText>
                    <ErrorMessage name="image" />
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
  );
};

export default NewCategory;
