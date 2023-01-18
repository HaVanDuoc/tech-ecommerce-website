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
    { name: "1", img: "", alt: "", href: "#" },
    { name: "2", img: "", alt: "", href: "#" },
    { name: "3", img: "", alt: "", href: "#" },
    { name: "4", img: "", alt: "", href: "#" },
    { name: "5", img: "", alt: "", href: "#" },
    { name: "6", img: "", alt: "", href: "#" },
    { name: "7", img: "", alt: "", href: "#" },
    { name: "8", img: "", alt: "", href: "#" },
    { name: "9", img: "", alt: "", href: "#" },
    { name: "10", img: "", alt: "", href: "#" },
  ];

  return (
    <SanPhamNoiBacWrapper>
      <SlickProduct title={title} data={data} />
    </SanPhamNoiBacWrapper>
  );
};

export default SanPhamNoiBac;
