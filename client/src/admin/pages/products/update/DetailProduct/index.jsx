import {
  Box,
  Button,
  Dialog,
  FormHelperText,
  Paper,
  Rating,
  Slide,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { formatVND } from "~/helper/format";
import { refreshPage } from "~/utils";
import { FieldForm } from "~/admin/Styled";
import ButtonSubmit from "~/admin/components/ButtonSubmit";
import removeEmpty from "~/helper/removeEmpty";
import axiosInstance from "~/utils/axiosInstance";

const DetailProduct = ({ fetch }) => {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    productId,
    name,
    price,
    discount,
    rating,
    stock,
    isActive,
    category,
  } = fetch;

  const rows = [
    createData("ID", productId),
    createData("Tên", name),
    createData("Giá", formatVND(price)),
    createData(
      "Giảm giá",
      discount ? `${discount}%` : "Không có chương trình giảm giá"
    ),
    createData("Số lượng", stock !== 0 ? stock : "Hết hàng"),
    createData("Tình trạng", isActive ? "Đang kinh doanh" : "Không kinh doanh"),
    createData(
      "Đánh giá",
      rating ? (
        <Rating name="read-only" value={rating} readOnly />
      ) : (
        "Chưa có đánh giá"
      )
    ),
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true); // Open form
  };

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
    <Styled>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 18,
                  }}
                >
                  {`Chi tiết ${category} ${name}`}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: 500 }}
                >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.value}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack justifyContent="center" alignItems="end">
        <Button variant="contained" onClick={handleClick} sx={{ marginTop: 1 }}>
          Cập nhật thông tin chi tiết
        </Button>
      </Stack>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          sx={{
            width: "500px",
            background: "#fff",
            borderRadius: "5px",
            padding: "30px",
            boxShadow: "7px 7px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              color: "#6990F2",
              fontSize: "27px",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Cập nhật thông tin
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, props) => {
              var data = removeEmpty(values); // Exclude filed data blank

              data.productId = productId; // Gửi thêm cái productId để server update biết thằng nào

              // return alert(JSON.stringify(data, null, 2)); // Test submit

              setSubmitting(true);

              setTimeout(async () => {
                // get data from DB
                const response = await axiosInstance({
                  method: "put",
                  url: "/admin/products/updateDetails",
                  headers: {
                    Authorization: localStorage.getItem("access_token"),
                  },
                  data: data,
                });

                handleSnackBar(response);

                setSubmitting(false);

                // Nếu tạo thành công thì reset page
                if (response.data.err === 0) {
                  refreshPage();
                }
              }, 2000);
            }}
          >
            {(props) => (
              <Form>
                <Stack alignItems="center" justifyContent="center">
                  {Array.isArray(fields) &&
                    fields.map((item, index) => (
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

                  {/* Button Submit */}
                  <FieldForm>
                    <Stack alignItems="center" justifyContent="center">
                      <ButtonSubmit disabled={isSubmitting}>
                        Cập nhật
                      </ButtonSubmit>
                    </Stack>
                  </FieldForm>
                </Stack>
              </Form>
            )}
          </Formik>

          {/* <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <ButtonUpdate type="submit">
              {isSubmitting ? <CircularProgressCustomize /> : "Update"}
            </ButtonUpdate>
          </form> */}
        </Box>
      </Dialog>
    </Styled>
  );
};

export default DetailProduct;

const Styled = styled(Box)(() => ({}));

function createData(name, value) {
  return { name, value };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const initialValues = {
  name: "",
  image: "",
  price: "",
  stock: "",
  category: "",
  brand: "",
};

const validationSchema = Yup.object({
  name: Yup.string(),
  price: Yup.number(),
  stock: Yup.number(),
  discount: Yup.number(),
});

const fields = [
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
