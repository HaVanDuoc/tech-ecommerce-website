import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const TopBar = () => {
  return (
    <Box
      className="top-bar"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        backgroundColor: "var(--color-main)",

        "p, a": {
          fontSize: "14px",
          color: "#fff",
        },

        svg: {
          color: "#fff",
          fontSize: "18px",
          margin: "0 3px",
        },

        a: {
          ":hover": {
            "p, svg": {
              color: "#c1c1c1",
            },
          },
        },

        hr: {
          height: "12px",
          margin: "auto 10px",
          borderColor: "#fff",
        },

        ".left": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        },

        ".right": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",

          ".item": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 7px",
            textTransform: "capitalize",
            cursor: "pointer",
          },
        },
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box className="left">
            <Link>
              <Typography>Kênh thương hiệu</Typography>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Link>
              <Typography>Tải ứng dụng</Typography>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>Kết nối</Typography>
              <Link
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FacebookOutlinedIcon />
              </Link>
              <Link
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <InstagramIcon />
              </Link>
            </Box>
          </Box>

          <Box className="right">
            <Box className="item">
              <NotificationsOutlinedIcon />
              <Typography>Thông báo</Typography>
            </Box>
            <Box className="item">
              <HelpOutlineOutlinedIcon />
              <Typography>Hỗ trợ</Typography>
            </Box>
            <Box className="item">
              <LanguageOutlinedIcon />
              <Typography>Tiếng việt</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TopBar;
