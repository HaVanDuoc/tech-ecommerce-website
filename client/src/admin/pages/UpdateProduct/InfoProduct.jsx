import {
  Box,
  Button,
  Grid,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { formatStatusProduct } from "~/helper/format";
import { PhotoCamera } from "@mui/icons-material";

const InfoProduct = ({ data }) => {
  const {
    id,
    productId,
    name,
    image,
    price,
    rating,
    stock,
    isActive,
    category,
    brand,
  } = data;

  const fields = [
    { name: "ID", value: productId, isEdit: false },
    { name: "Tên", value: name, isEdit: true, popLabel: "Nhập tên mới" },
    { name: "Giá", value: price, isEdit: true, popLabel: "Nhập giá" },
    { name: "Số lượng", value: stock, isEdit: true, popLabel: "Nhập số lượng" },
    {
      name: "Trạng thái",
      value: isActive === "0" ? "Đang kinh doanh" : "Không kinh doanh",
      isEdit: true,
      popLabel: "Chọn trạng thái",
    },
    { name: "Đánh giá", value: rating, isEdit: false },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPop = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
      }}
    >
      <Box sx={{ minWidth: "400px" }}>
        <form action="#">
          <img src={image} alt="Ảnh minh họa sản phẩm" width="400px" />
        </form>
      </Box>
      <Box>
        {fields.map((item, index) => {
          return (
            <Stack
              key={index}
              alignItems="center"
              flexDirection="row"
              height="56px"
              sx={{
                paddingTop: 1,
                paddingBottom: 1,

                "&:hover": {
                  ".buttonEdit": {
                    opacity: 1,
                  },
                },
              }}
            >
              {item.value && (
                <Stack flexDirection="row">
                  <Typography fontWeight={500} width="100px">
                    {item.name}
                  </Typography>
                  <Typography>{item.value}</Typography>
                </Stack>
              )}
              {item.isEdit && (
                <Box>
                  <IconButton
                    disableRipple
                    onClick={handleClick}
                    className="buttonEdit"
                    sx={{ transition: "opacity .3s ease", opacity: 0 }}
                  >
                    <ModeEditOutlineOutlinedIcon />
                  </IconButton>

                  <Popover
                    id={idPop}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "center",
                      horizontal: "left",
                    }}
                    sx={{
                      paddingTop: 1,

                      ".css-3bmhjh-MuiPaper-root-MuiPopover-paper": {
                        boxShadow: "none",
                      },
                    }}
                  >
                    <form action="#">
                      <TextField label={item.popLabel} size="small" name="" />
                      <Button type="submit" variant="contained">
                        OK
                      </Button>
                    </form>
                  </Popover>
                </Box>
              )}
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
};

export default InfoProduct;
