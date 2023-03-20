import {
  Box,
  Container,
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
import React, { useState } from "react";
import { formatDiscount, formatVND } from "~/helper/format";
import ButtonUploadImage from "./UpdateImages";

const InfoProduct = ({ data }) => {
  const {
    productId,
    name,
    images,
    price,
    discount,
    rating,
    stock,
    isActive,
    category,
  } = data;

  if (images) {
    var arrImages = images.split("=,");
  }

  var [selected, setSelected] = useState([]);

  const handleClick = (index) => {
    setSelected(arrImages[index]);
  };

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
      <LeftImage item xs={6}>
        <Container disableGutters>
          <Box className="changeImage">
            <ButtonUploadImage fileList={arrImages} />
          </Box>

          <Box className="mainImage">
            <img
              src={selected}
              alt="Ảnh minh họa sản phẩm"
              style={{ minWidth: 350, minHeight: 350, width: 350 }}
              className="slide"
            />
          </Box>

          <Box className="optionImage">
            {Array.isArray(arrImages) &&
              arrImages.length > 0 &&
              arrImages.map((image, index) => (
                <img
                  height={"100%"}
                  src={image}
                  alt=""
                  key={index}
                  style={
                    image === selected
                      ? {
                          border: "3px solid dodgerblue",
                          opacity: 1,
                        }
                      : {
                          border: "3px solid transparent",
                          opacity: 0.5,
                        }
                  }
                  onClick={() => handleClick(index)}
                />
              ))}
          </Box>
        </Container>
      </LeftImage>

      <RightDetail item xs={6}>
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
      </RightDetail>
    </Grid>
  );
};

export default InfoProduct;

const LeftImage = ({ children, ...props }) => {
  return (
    <Grid
      {...props}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        "&:hover": {
          ".changeImage": {
            opacity: 1,
            transition: "all .4s ease-in-out",
          },
        },

        ".changeImage": {
          opacity: 0,
          transition: "all .4s ease-in-out",
        },

        ".mainImage": {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },

        img: {
          // width: "100%",
          // height: "100%",
        },

        ".optionImage": {
          width: "100%",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      {children}
    </Grid>
  );
};

const RightDetail = ({ children, ...props }) => {
  return <Grid {...props}>{children}</Grid>;
};

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
