import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminTitle, FieldForm } from "~/admin/Styled";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import removeEmpty from "~/helper/removeEmpty";
import ButtonSubmit from "~/admin/components/ButtonSubmit";
import { useSnackbar } from "notistack";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { FetchBrand, FetchCategorySelect } from "~/helper/fetch";
import { formatCapitalization } from "~/helper/format";
import { refreshPage } from "~/utils";
import CheckIcon from "@mui/icons-material/Check";
import axiosInstance from "~/utils/axiosInstance";

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

export default function CreateNewProduct() {
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

  const checkName = () => {
    const input = document.querySelector("input#name").value;

    const check = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/admin/products/checkNameProduct",
        data: { key: input },
      });

      handleSnackBar(response);
    };

    check();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, props) => {
        var data = removeEmpty(values); // Exclude filed data blank

        // return console.log(JSON.stringify(data, null, 2)); // Test submit

        setTimeout(async () => {
          setSubmitting(true);
          // get data from DB
          const response = await axiosInstance({
            method: "post",
            url: "/admin/products",
            headers: {
              Authorization: localStorage.getItem("access_token"),
            },
            data: data,
          });

          setSubmitting(false);

          handleSnackBar(response);

          // Nếu tạo thành công thì reset page
          if (response.data.err === 0) {
            refreshPage();
          }
        });
      }}
    >
      {(props) => (
        <Form method="post" encType="multipart/form-data">
          <Box sx={{ flex: 4, paddingLeft: 4, paddingRight: 4 }}>
            <AdminTitle>Sản phẩm mới</AdminTitle>
            <Grid container spacing={2}>
              <Grid item xs={4.5} position="relative">
                <Stack position="absolute" right={30} top={33} zIndex={2}>
                  <IconButton onClick={checkName}>
                    <CheckIcon />
                  </IconButton>
                </Stack>

                {Array.isArray(dummyProducts) &&
                  dummyProducts.map((item, index) => (
                    <FieldForm key={index}>
                      <Field
                        as={item.as}
                        label={item.label}
                        id={item.name}
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
                  <ButtonSubmit disabled={isSubmitting}>Tạo</ButtonSubmit>
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

//
const Brands = ({ props, name, categoryId }) => {
  const [listBrand, setListBrand] = useState([]);

  // Fetch list brand
  const brandList = FetchBrand(categoryId);
  useEffect(() => {
    setListBrand(brandList);
  }, [brandList]);

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    props.setFieldValue(name, event.target.value);
  };

  return (
    <Box>
      <FormControl>
        <FormLabel sx={{ marginBottom: 1 }}>Chọn thương hiệu</FormLabel>
        <Field
          as={RadioGroup}
          row
          name={name}
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiRadio-root ": {
              display: "none",
            },
          }}
        >
          {Array.isArray(listBrand) &&
            listBrand.map((item) => (
              <FormControlLabel
                key={item.id}
                name={item.name}
                value={item.brandId}
                control={<Radio />}
                label={
                  <Chip
                    label={formatCapitalization(item.name)}
                    variant={value === item.brandId ? "contained" : "outlined"}
                    color={value === item.brandId ? "primary" : "default"}
                    sx={{
                      marginLeft: 1,
                      marginBottom: 1,
                    }}
                  />
                }
              />
            ))}
        </Field>
      </FormControl>

      <FormHelperText>
        <ErrorMessage name={name} />
      </FormHelperText>
    </Box>
  );
};

//
const Categories = ({ props, name }) => {
  const [listCategory, setListCategory] = useState([]);

  // Fetch list category
  const categoryList = FetchCategorySelect();
  React.useEffect(() => {
    setListCategory(categoryList);
  }, [categoryList]);

  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    props.setFieldValue(name, event.target.value);
  };

  return (
    <Box>
      {/* Phân loại */}
      <Box>
        <FormControl>
          <FormLabel sx={{ marginBottom: 1 }}>Phân loại</FormLabel>
          <Field
            as={RadioGroup}
            row
            name={name}
            value={value}
            onChange={handleChange}
            sx={{
              "& .MuiRadio-root ": {
                display: "none",
              },
            }}
          >
            {Array.isArray(listCategory) &&
              listCategory.map((item) => (
                <FormControlLabel
                  key={item.id}
                  name={item.name}
                  value={item.categoryId}
                  control={<Radio />}
                  label={
                    <Chip
                      label={formatCapitalization(item.name)}
                      variant={
                        value === item.categoryId ? "contained" : "outlined"
                      }
                      color={value === item.categoryId ? "primary" : "default"}
                      sx={{
                        marginLeft: 1,
                        marginBottom: 1,
                      }}
                    />
                  }
                />
              ))}
          </Field>
        </FormControl>

        <FormHelperText>
          <ErrorMessage name={name} />
        </FormHelperText>
      </Box>

      {/* Thương hiệu */}
      {value && <Brands name="brand" props={props} categoryId={value} />}
    </Box>
  );
};

//
const UploadImage = ({ props, name }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    // Phải chuyển sang string trước khi gửi đến server
    const arrayToString = JSON.stringify(selected);

    props.setFieldValue(name, arrayToString);
  }, [selected]);

  const handleChange = (e) => {
    const images = e.target.files;

    // `images` là 1 object array
    for (let i = 0; i < images.length; i++) {
      let file = images.item(i); // Lấy từng item trong images

      let fileReader = new FileReader();
      fileReader.readAsDataURL(file); // encode về base64

      fileReader.onload = (e) => {
        // Tạo 1 chuỗi duới dạng object lưu fileName, fileSize, fileType và code base64 của image
        let data = {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          base64: e.target.result,
        };
        selected.push(data);

        setSelected([...selected]); // set vào list
      };
    }
  };

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

  const Preview = () => {
    const handleDeleteItem = (image) => {
      setSelected(() => selected.filter((item) => item !== image));
    };

    return (
      <ImageList
        sx={{ width: "100%", height: "auto" }}
        cols={3}
        rowHeight={164}
      >
        {Array.isArray(selected) &&
          selected.map((item, index) => {
            return (
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
                  onClick={() => handleDeleteItem(item)}
                >
                  <DeleteIcon />
                </IconButton>
                <img
                  className="image"
                  src={item?.base64}
                  alt=""
                  loading="lazy"
                />
              </ImageListItem>
            );
          })}
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
        }}
      >
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

        <Preview />
      </Box>

      <FormHelperText>
        <ErrorMessage name={name} />
      </FormHelperText>
    </Box>
  );
};

//
const dummyProducts = [
  {
    as: TextField,
    label: "Tên sản phẩm",
    type: "text",
    name: "name",
  },
  {
    as: TextField,
    label: "Giá",
    type: "number",
    name: "price",
  },
  {
    as: TextField,
    label: "Số lượng nhập kho",
    type: "number",
    name: "stock",
  },
  {
    as: TextField,
    label: "Khuyến mãi giảm giá",
    type: "number",
    name: "discount",
  },
];
