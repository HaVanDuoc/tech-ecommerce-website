import {
  Box,
  FormHelperText,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import ButtonSubmit from "~/admin/components/ButtonSubmit";
import { FieldForm } from "~/admin/Styled";
import removeEmpty from "~/helper/removeEmpty";
import { refreshPage } from "~/utils";
import axiosInstance from "~/utils/axiosInstance";

const UpdateBrand = () => {
  const [data, setData] = useState({});
  const brandId = useParams().brandId;

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance(`/admin/display/brand/${brandId}`);
      setData(response.data.data);
    };

    fetch();
  }, [brandId]);

  // Form Update
  const UpdateForm = () => {
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

    const initialValues = {
      name: "",
      link: "",
      logo: "",
    };

    const validationSchema = Yup.object({
      name: Yup.string(),
      link: Yup.string(),
      logo: Yup.mixed(),
    });

    const categories = [
      {
        as: TextField,
        label: "Tên thương hiệu",
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

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, props) => {
          var data = removeEmpty(values);

          // return alert(JSON.stringify(data, null, 2)); // Test submit

          setSubmitting(true);

          setTimeout(async () => {
            const response = await axiosInstance({
              method: "put",
              url: `/admin/display/brand/update/${brandId}`,
              data: data,
            });

            setSubmitting(false);

            handleSnackBar(response);

            // Nếu tạo thành công thì reset form
            if (response.data.err === 0) return refreshPage();
          }, 2000);
        }}
      >
        {(props) => (
          <Form method="post" encType="multipart/form-data">
            <Box sx={{ flex: 4, paddingLeft: 4, paddingRight: 4 }}>
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
                      name="logo"
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
                            props.setFieldValue("logo", e.target.result); // return file name
                          };
                        }
                      }}
                    />
                    {image && <img src={image.imagePreviewUrl} alt="" />}
                    <FormHelperText>
                      <ErrorMessage name="logo" />
                    </FormHelperText>
                  </FieldForm>

                  <FieldForm>
                    <ButtonSubmit disabled={isSubmitting}>Update</ButtonSubmit>
                  </FieldForm>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <Fragment>
      <Box>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            textTransform: "uppercase",
            paddingLeft: "40px",
          }}
        >
          Thương hiệu {data.name}
        </Typography>

        <Box
          sx={{
            padding: "30px 40px 40px 40px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Logo</TableCell>
                  <TableCell align="right">Thương hiệu</TableCell>
                  <TableCell align="right">Liên kết tới</TableCell>
                  <TableCell align="right">Lượt truy cập</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img src={data.logo} alt="" width="100px" />
                  </TableCell>
                  <TableCell align="right">{data.name}</TableCell>
                  <TableCell align="right">
                    <Link
                      href={
                        process.env.REACT_APP_PUBLIC_FOLDER + data.link ||
                        "Trống"
                      }
                    >
                      {data.link
                        ? process.env.REACT_APP_PUBLIC_FOLDER + data.link
                        : "Trống"}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{data.accessTime || 0}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Box>
        <UpdateForm />
      </Box>
    </Fragment>
  );
};

export default UpdateBrand;
