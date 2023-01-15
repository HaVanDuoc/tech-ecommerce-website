import { Box, styled } from "@mui/material";
import React from "react";
import SlickProduct from "~/containers/SlickProduct";

const SanPhamNoiBacWrapper = styled(Box)(() => ({
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "var(--border-radius)",
}));

const SanPhamNoiBac = () => {
  const title = "Sản phẩm nổi bậc";
  const data = [
    { name: "1", img: "", href: "#" },
    { name: "2", img: "", href: "#" },
    { name: "3", img: "", href: "#" },
    { name: "4", img: "", href: "#" },
    { name: "5", img: "", href: "#" },
    { name: "6", img: "", href: "#" },
    { name: "7", img: "", href: "#" },
    { name: "8", img: "", href: "#" },
    { name: "9", img: "", href: "#" },
    { name: "10", img: "", href: "#" },
  ];

  return (
    <SanPhamNoiBacWrapper>
      <SlickProduct title={title} data={data} />
    </SanPhamNoiBacWrapper>
  );
};

export default SanPhamNoiBac;
