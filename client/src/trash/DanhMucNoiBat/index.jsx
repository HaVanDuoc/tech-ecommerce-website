import { Box, Container, Grid, Link, styled, Typography } from "@mui/material";
import React from "react";
import TitleSecondary from "../components/TitleSecondary";

const Styled = styled(Box)(() => ({
  margin: "var(--margin-component-home)",

  "& .item": {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    padding: "10px 0",
  },

  "& img": {
    width: "60px",
  },

  "& p": {
    fontSize: "0.8em",
    fontWeight: "500",
    color: "var(--color-text)",
  },
}));

const DanhMucNoiBac = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // Public Folder
  const RF = "/assets/danh-muc-noi-bac/"; // Relative Folder

  return (
    <Styled>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          padding: "var(--padding-component-home)",
        }}
      >
        <TitleSecondary>Danh mục nổi bật</TitleSecondary>
        <Grid container columns={10}>
          {ItemsFeaturedCategory.map((item, index) => (
            <Grid item xs={1} key={index} className="item">
              <Link href={item.url}>
                <img src={PF + RF + item.img} alt={item.name} />
                <Typography>{item.name}</Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Styled>
  );
};

export default DanhMucNoiBac;

export const ItemsFeaturedCategory = [
  { name: "Bàn phím", img: "ban-phim-128x129.png", url: "#" },
  { name: "Cáp sạc", img: "Capsac-129x129.png", url: "#" },
  { name: "Chuột máy tính", img: "chuot-128x129.png", url: "#" },
  { name: "Đồng hồ thời trang", img: "Donghothoitrang-128x129.png", url: "#" },
  { name: "Đồng hồ thông minh", img: "Donghothongminh-128x129.png", url: "#" },
  { name: "Camera", img: "icon-camera-128x129.png", url: "#" },
  { name: "Máy cũ giá rẻ", img: "icon-may-cu-60x60.png", url: "#" },
  { name: "Laptop", img: "Laptop-129x129.png", url: "#" },
  { name: "Loa", img: "Loa-128x128.png", url: "#" },
  { name: "Màn hình máy tính", img: "Manhinhmaytinh-128x129.png", url: "#" },
  {
    name: "Thiết bị nhà thông minh",
    img: "may-chieu-icon-128x129.png",
    url: "#",
  },
  { name: "Máy in", img: "Mayin-128x129.png", url: "#" },
  { name: "Máy tính bộ", img: "Maytinhbo-128x129.png", url: "#" },
  { name: "Ốp lưng", img: "Oplung-128x128.png", url: "#" },
  { name: "Phụ kiện gaming", img: "Phukiengaming-128x129.png", url: "#" },
  { name: "Sạc dự phòng", img: "Sacduphong-128x129.png", url: "#" },
  { name: "Sim, thẻ cào", img: "Simthecao-129x129.png", url: "#" },
  { name: "Tablet", img: "Tablet-128x129.png", url: "#" },
  { name: "Tai nghe", img: "Tainghe-128x129.png", url: "#" },
  { name: "Điện thoại độc quyền", img: "dien-thoại.png", url: "#" },
];
