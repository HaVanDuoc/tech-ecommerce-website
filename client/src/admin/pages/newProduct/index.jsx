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
  // image: Yup.string().required("*Bắt buộc"),
  price: Yup.string().required("*Bắt buộc"),
  stock: Yup.string().required("*Bắt buộc"),
  category: Yup.string().required("*Bắt buộc"),
  brand: Yup.string().required("*Bắt buộc"),
});

export default function NewProduct() {
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [data, setData] = React.useState({});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, props) => {
        const data = removeEmpty(values); // Exclude filed data blank

        // return alert(JSON.stringify(data, null, 2)); // Test submit

        setSubmitting(true);

        setTimeout(async () => {
          // get data from DB
          const response = await axios({
            method: "post",
            url: "/admin/product/newProduct",
            data: data,
          });

          setData(response.data);

          setSubmitting(false);

          // Nếu tạo thành công thì reset form
          if (response.data.err === 0) return props.resetForm();
        }, 2000);
      }}
    >
      {(props) => (
        <Form>
          <Box sx={{ flex: 4, paddingLeft: 4, paddingRight: 4 }}>
            <AdminTitle>Sản phẩm mới</AdminTitle>
            <Grid container spacing={2}>
              <Grid item xs={4}>
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
              <Grid item xs={8}></Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
