import {
  Box,
  Grid,
  Paper,
  Rating,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { formatDiscount, formatVND } from "~/helper/format";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const InfoProduct = ({ data }) => {
  const {
    productId,
    name,
    image,
    price,
    discount,
    rating,
    stock,
    isActive,
    category,
  } = data;

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData("ID", productId),
    createData("Tên", name),
    createData("Giá", formatVND(price)),
    createData(
      "Giảm giá",
      discount ? formatDiscount(discount) : "Không có chương trình giảm giá"
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

  return (
    <Grid container>
      <Grid item xs={4}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt="Ảnh minh họa sản phẩm"
            style={{ minWidth: 350, minHeight: 350, width: 350 }}
          />
        </Box>
      </Grid>

      <Grid item xs={8}>
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
      </Grid>
    </Grid>
  );
};

export default InfoProduct;
