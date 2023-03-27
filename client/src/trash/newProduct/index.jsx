import {
  Box,
  FormHelperText,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { products } from "./components/array";
import { AdminTitle, FieldForm } from "~/admin/Styled";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import removeEmpty from "~/helper/removeEmpty";
import Categories from "./components/Category";
import ButtonSubmit from "~/admin/components/ButtonSubmit";
import axios from "axios";
import { useSnackbar } from "notistack";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

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

        return alert(JSON.stringify(data, null, 2)); // Test submit

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

                {/* Phân loại */}
                <FieldForm>
                  <Categories props={props} name="category" />
                </FieldForm>

                {/* Button Submit */}
                <FieldForm>
                  <ButtonSubmit disabled={isSubmitting}>Create</ButtonSubmit>
                </FieldForm>
              </Grid>

              {/* Upload Image */}
              <Grid item xs={7.5}>
                {/* <UploadFile props={props} name="image" /> */}
                <UploadImage props={props} name="image" />
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

const UploadImage = ({ props, name }) => {
  // const [selected, setSelected] = useState({
  //   files: [],
  //   imagesPreviewUrl: [],
  // });

  const [imageList, setImageList] = useState([]);

  const handleChange = (e) => {
    const image = e.target.files[0];
    console.log("image", image);
  };

  // const handleChange = (e) => {
  //   let files = e.target.files;
  //   let selected = {
  //     files: [],
  //     imagesPreviewUrl: [],
  //   };

  //   Object.values(files).forEach((file) => {
  //     let reader = new FileReader();

  //     reader.readAsDataURL(file);

  //     reader.onload = (e) => {
  //       selected.files.push(e.target.result);
  //       selected.imagesPreviewUrl.push(e.target.result);
  //     };
  //   });

  //   props.setFieldValue(name, selected.files);
  //   setSelected(selected);
  // };

  const Input = ({ children }) => {
    const handleClick = () => {
      document.querySelector(".file-input").click();
    };

    return (
      <Box
        sx={{
          height: "167px",
          display: "flex",
          cursor: "pointer",
          margin: "10px 0",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: "5px",
          border: "2px dashed #6990F2",
          color: "#6990F2",
        }}
        onClick={handleClick}
      >
        {children}
      </Box>
    );
  };

  const Preview = ({ imageList }) => {
    return (
      <ImageList
        sx={{ width: "100%", height: "auto" }}
        cols={3}
        rowHeight={164}
      >
        {Array.isArray(imageList) &&
          imageList.map((item, index) => (
            <ImageListItem
              key={index}
              sx={{
                position: "relative",

                "&:hover": {
                  ".delete": {
                    color: "red",
                    opacity: 10,
                    cursor: "pointer",
                    zIndex: "99",
                  },

                  ".image": {
                    opacity: 0.5,
                  },
                },
              }}
            >
              <IconButton
                className="delete"
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  cursor: "pointer",
                  opacity: 0,
                }}
              >
                <DeleteIcon />
              </IconButton>
              <img className="image" src={item} alt="" loading="lazy" />
            </ImageListItem>
          ))}
      </ImageList>
    );
  };

  return (
    <Box position="relative">
      <Box
        sx={{
          width: "500px",
          background: "#fff",
          borderRadius: "5px",
          // padding: "30px",
          // boxShadow: "7px 7px 12px rgba(0,0,0,0.05)",
        }}
      >
        {/* <form method="post" encType="multipart/form-data"> */}
        <Input>
          <input
            name="images"
            class="file-input"
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={handleChange}
          />
          <CloudUploadOutlinedIcon fontSize="large" />
          <Typography>Chọn ảnh để tải lên</Typography>
        </Input>

        <Preview imageList={imageList} />

        {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ margin: "20px 0" }}
          >
            Update
          </Button> */}
        {/* </form> */}
      </Box>

      <FormHelperText>
        <ErrorMessage name={name} />
      </FormHelperText>
    </Box>
  );
};
