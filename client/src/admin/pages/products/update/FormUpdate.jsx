import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { FieldForm } from "~/admin/Styled";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import removeEmpty from "~/helper/removeEmpty";
import axios from "axios";
import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { selectorOpen } from "~/redux/ButtonEditPageUpdateProductInAdmin/reducers";
import { useDispatch, useSelector } from "react-redux";
import { close as closeForm } from "~/redux/ButtonEditPageUpdateProductInAdmin/actions";
import { refreshPage } from "~/utils";
import UploadFile from "./UploadFile";
import SelectCategory from "~/admin/components/SelectCategory";
import { products } from "../../newProduct/components/array";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const initialValues = {
  name: "",
  image: "",
  price: "",
  stock: "",
  isActive: "",
  discount: "",
  category: "",
  brand: "",
};

const validationSchema = Yup.object({
  name: Yup.string(),
  image: Yup.mixed(),
  price: Yup.string(),
  stock: Yup.string(),
  discount: Yup.string(),
  isActive: Yup.string(),
  category: Yup.string(),
  brand: Yup.string(),
});

const FormUpdate = () => {
  const [isSubmitting, setSubmitting] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

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

  // Redux open form update
  const [open, setOpen] = useState(false);
  const show = useSelector(selectorOpen);
  useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = () => dispatch(closeForm());

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, props) => {
        var data = removeEmpty(values); // Exclude filed data blank

        // return alert(JSON.stringify(data, null, 2)); // Test submit

        setSubmitting(true);

        setTimeout(async () => {
          const productId = window.location.href.substring(
            window.location.href.lastIndexOf("/") + 1
          );

          // get data from DB
          const response = await axios({
            method: "put",
            url: `/admin/product/update/${productId}`,
            data: data,
          });

          setSubmitting(false);

          handleSnackBar(response);

          // Nếu tạo thành công thì reset form
          if (response.data.err === 0) {
            props.resetForm();
            handleClose();
            refreshPage();
          }
        }, 2000);
      }}
    >
      {(props) => (
        <Form method="post" encType="multipart/form-data">
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              Hãy nhập các thông tin cần thay đổi
            </BootstrapDialogTitle>

            <DialogContent dividers>
              <Box sx={{ flex: 4, paddingLeft: 4, paddingRight: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {/*  */}
                    {/* Field username, price, stock, discount */}
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

                    {/* Field tình trạng */}
                    <FieldForm>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Tình trạng
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          size="small"
                        >
                          <Field
                            as={FormControlLabel}
                            name="isActive"
                            value="0"
                            control={<Radio size="small" />}
                            label="Kinh doanh"
                          />
                          <Field
                            as={FormControlLabel}
                            name="isActive"
                            value="1"
                            control={<Radio size="small" />}
                            label="Ngừng kinh doanh"
                          />
                        </RadioGroup>
                      </FormControl>

                      <FormHelperText>
                        <ErrorMessage name="gender" />
                      </FormHelperText>
                    </FieldForm>

                    {/* Field Phân loại */}
                    <FieldForm>
                      <SelectCategory props={props} name="category" />
                    </FieldForm>
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel>Chọn hình ảnh minh họa</FormLabel>
                    <UploadFile props={props} name="images" />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>

            <DialogActions>
              <Button type="submit" onClick={props.submitForm}>
                Lưu thay đổi
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </Form>
      )}
    </Formik>
  );
};

export default FormUpdate;
