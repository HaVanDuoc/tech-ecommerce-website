import "./newProduct.css";
import { FormHelperText, Grid } from "@mui/material";
import React from "react";
import { products } from "./components/array";
import { AdminTitle, FieldForm } from "~/admin/Styled";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import removeEmpty from "~/helper/removeEmpty";
import Categories from "./components/Category";

const initialValues = {
  name: "",
  image: "",
  price: "",
  stock: "",
};

const validationSchema = Yup.object({
  name: Yup.string().min(1).required("*Bắt buộc"),
  image: Yup.string().min(1).required("*Bắt buộc"),
  price: Yup.string().min(1).required("*Bắt buộc"),
  stock: Yup.number().required("*Bắt buộc"),
});

export default function NewProduct() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, props) => {
        const data = removeEmpty(values); // Exclude filed data blank

        return alert(JSON.stringify(data, null, 2)); // Test submit
      }}
    >
      {(props) => (
        <div className="newProduct">
          <AdminTitle>Sản phẩm mới</AdminTitle>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              {products.map((item, index) => (
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
                <Categories />
              </FieldForm>
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid>
        </div>
      )}
    </Formik>
  );
}
