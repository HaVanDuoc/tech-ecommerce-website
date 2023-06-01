import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { PF } from "~/utils/__variables";

const Footer = () => {
  const supports = [
    { id: 1, text: "Hotline: 123-456-789" },
    { id: 2, text: "Các câu hỏi thường gặp" },
    { id: 3, text: "Gửi yêu cầu hỗ trợ" },
    { id: 4, text: "Hướng dẫn đặt hàng" },
    { id: 5, text: "Phương thức vận chuyển" },
    { id: 6, text: "Chính sách đổi trả" },
    { id: 7, text: "Hướng dẫn trả góp" },
    { id: 8, text: "Chính sách hàng nhập khẩu" },
    { id: 9, text: "Hỗ trợ khách hàng: hotro@tech.vn" },
    { id: 10, text: "Báo lỗi bảo mật: security@tech.vn" },
  ];

  const aboutUs = [
    { text: "Giới thiệu Tech" },
    { text: "Tech Blog" },
    { text: "Tuyển dụng" },
    { text: "Chính sách bảo mật thanh toán" },
    { text: "Chính sách bảo mật thông tin cá nhân" },
    { text: "Chính sách giải quyết khiếu nại" },
    { text: "Điều khoản sử dụng" },
    { text: "Giới thiệu Tech Xu" },
    { text: "Gửi Astra nhận Xu mua sắm thả ga" },
    { text: "Tiếp thị liên kết cùng Tech" },
    { text: "Bán hàng doanh nghiệp" },
    { text: "Điều kiện vận chuyển" },
  ];

  const coop = [
    { text: "Quy chế hoạt động Sàn GDTMĐT" },
    { text: "Bán hàng cùng Tech" },
  ];

  return (
    <Box
      sx={{
        marginTop: "50px",
        paddingTop: "50px",
        backgroundColor: "#fff",
        boxShadow: "1px 0px 2px 1px rgba(0, 0, 0, 0.175)",

        ".title": {
          fontWeight: 500,
          marginBottom: 1,
        },

        ".list": {
          ".item": {
            fontSize: ".85rem",
            lineHeight: "24px",
            color: "#666",
            cursor: "pointer",

            ":hover": {
              textDecorationLine: "underline",
            },
          },
        },
      }}
    >
      <Container maxWidth="lg">
        {/*  */}
        <Grid container>
          {/* Hỗ trợ khách hàng */}
          <Grid items xs>
            <Stack flexDirection="column">
              <Box className="title">Hỗ trợ khách hàng</Box>
              <Stack flexDirection="column" className="list">
                {supports.map((item, index) => (
                  <Box key={index}>
                    <Typography className="item">{item.text}</Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Về Tech */}
          <Grid items xs>
            <Stack flexDirection="column">
              <Box className="title">Hỗ trợ khách hàng</Box>
              <Stack flexDirection="column" className="list">
                {aboutUs.map((item, index) => (
                  <Box key={index}>
                    <Typography className="item">{item.text}</Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Hợp tác */}
          <Grid items xs>
            <Stack flexDirection="column">
              <Box className="title">Hợp tác liên kết</Box>
              <Stack flexDirection="column" className="list">
                {coop.map((item, index) => (
                  <Box key={index}>
                    <Typography className="item">{item.text}</Typography>
                  </Box>
                ))}
              </Stack>
              <Stack flexDirection="column">
                <Box className="title">Chứng nhận bởi</Box>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="start"
                >
                  <Box sx={{ paddingRight: 1 }}>
                    <img
                      src={PF + "/assets/footer/bo-cong-thuong-2.png"}
                      alt=""
                      height="40px"
                    />
                  </Box>
                  <Box>
                    <img
                      src={PF + "/assets/footer/bo-cong-thuong.svg"}
                      alt=""
                      height="40px"
                    />
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          {/* Phương thức thanh toán */}
          <Grid items xs>
            <Stack flexDirection="column">
              <Box className="title">Phương thức thanh toán</Box>
              <Stack flexDirection="column" className="list">
                {aboutUs.map((item, index) => (
                  <Box key={index}>
                    <Typography className="item">{item.text}</Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ margin: "20px 0" }} />

        {/*  */}
        <Stack
          sx={{
            "& p": {
              color: "#666",
              fontSize: ".8rem",
              lineHeight: "30px",
            },
          }}
        >
          <Typography>
            Trụ sở chính: Tòa nhà Viettel, Số 285, đường Cách Mạng Tháng 8,
            phường 12, quận 10, Thành phố Hồ Chí Minh
          </Typography>
          <Typography>
            Tiki nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua
            và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng
          </Typography>
          <Typography>
            Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch và
            Đầu tư Thành phố Hồ Chí Minh cấp lần đầu ngày 06/01/2010 và sửa đổi
            lần thứ 23 ngày 14/02/2023
          </Typography>
        </Stack>
      </Container>

      <Divider sx={{ marginTop: "20px" }} />

      <Stack alignItems="center" justifyContent="center" padding="15px 0">
        <Typography fontSize=".9rem" color="#666">
          © 2023 - Bản quyền của Công ty TNHH Tech
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
