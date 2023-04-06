import { Box, styled } from "@mui/material";
import React from "react";

const Tabs = ({ tab, setTab }) => {
  const clickTab = (tab) => {
    const tabs = document.querySelectorAll(".tab_child");

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", (e) => {
        tabs.forEach((tab) => tab.classList.remove("active"));
        tab.classList.add("active");
        let line = document.querySelector(".line");
        line.style.width = e.target.offsetWidth + "px";
        line.style.left = e.target.offsetLeft + "px";
      });
    });

    setTab(tab);
  };

  return (
    <Styles>
      <Box className="tabs_box">
        {dummy_tabs.map((item, index) => {
          return (
            <Box
              className="tab_child"
              onClick={() => clickTab(item.tab)}
              key={item.id}
            >
              {item.tab}
            </Box>
          );
        })}

        <Box className="line"></Box>
      </Box>
    </Styles>
  );
};

export default Tabs;

export const dummy_tabs = [
  { id: 0, tab: "Tất cả", link: "" },
  { id: 1, tab: "Chờ xác nhận", link: "/profile/?type=1" },
  { id: 2, tab: "Chờ lấy hàng", link: "/profile/order/cho-lay-hang" },
  { id: 3, tab: "Đang giao", link: "/profile/order/dang-giao" },
  { id: 4, tab: "Đã giao", link: "/profile/order/da-giao" },
  { id: 5, tab: "Đã hủy", link: "/profile/order/da-huy" },
  { id: 6, tab: "Trả hàng", link: "/profile/order/tra-hang" },
];

const Styles = styled(Box)(() => ({
  ".tabs_box": {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 600,
    backgroundColor: "#fff",
    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.25)",

    ".tab_child": {
      flex: 1,
      fontSize: "16px",
      fontWeight: 500,
      color: "#666",
      background: "none",
      border: "none",
      padding: "18px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      "&.active": {
        fontWeight: 600,
        color: "dodgerblue",
      },
    },

    ".line": {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "171px",
      height: "5px",
      borderRadius: "5px",
      backgroundColor: "dodgerblue",
      transition: "all .3s ease-in-out",
    },
  },
}));
