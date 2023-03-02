import { Box, FormHelperText, Grid } from "@mui/material";
import React from "react";
import { products } from "./components/array";
import { AdminTitle, FieldForm } from "~/admin/Styled";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import removeEmpty from "~/helper/removeEmpty";
import Categories from "./components/Category";
import ButtonSubmit from "~/admin/components/ButtonSubmit";
import axios from "axios";
import UploadFile from "~/components/UploadFile";
import { useSnackbar } from "notistack";

const initialValues = {
  name: "",
  image: "",
  price: "",
  stock: "",
  category: "",
  brand: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("*Bắt buộc"),
  image: Yup.mixed().required("*Bắt buộc"),
  price: Yup.string().required("*Bắt buộc"),
  stock: Yup.string().required("*Bắt buộc"),
  category: Yup.string().required("*Bắt buộc"),
  brand: Yup.string().required("*Bắt buộc"),
});

export default function NewProduct() {
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
        var data = removeEmpty(values); // Exclude filed data blank

        // return alert(JSON.stringify(data, null, 2)); // Test submit

        setSubmitting(true);

        setTimeout(async () => {
          // get data from DB
          const response = await axios({
            method: "post",
            url: "/admin/product/newProduct",
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
            <AdminTitle>Sản phẩm mới</AdminTitle>
            <Grid container spacing={2}>
              <Grid item xs={4.5}>
                {Array.isArray(products) &&
                  products.map((item, index) => (
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
                  <Categories props={props} name="category" />
                </FieldForm>

                <FieldForm>
                  <ButtonSubmit disabled={isSubmitting}>Create</ButtonSubmit>
                </FieldForm>
              </Grid>
              <Grid item xs={7.5}>
                <UploadFile props={props} name="image" />
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
