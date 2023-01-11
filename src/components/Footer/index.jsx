import { Box, Container, Grid, Link, styled, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const Styled = styled(Box)(() => ({
  backgroundColor: "#fff",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
}));

const Footer = () => {
  return (
    <Styled>
      <Container maxWidth="xl" sx={{ marginTop: "80px" }}>
        <Container maxWidth="lg" disableGutters>
          <Grid container spacing={2} sx={{ padding: "50px" }}>
            <Grid items xs={3}>
              <Stack direction="column">
                <Typography>Thông tin khuyến mãi</Typography>
                <Link>Tích điểm quà tặng</Link>
                <Link></Link>
                <Link>Tin khuyến mãi</Link>
                <Link>Tuyển dụng</Link>
                <Link>Quan hệ cổ đông</Link>
              </Stack>
            </Grid>
            <Grid items xs={3}>
              <Stack direction="column">
                <Typography>Thông tin khuyến mãi</Typography>
                <Link>Giới thiệu</Link>
                <Link>Tin tức</Link>
                <Link>Tin khuyến mãi</Link>
                <Link>Tuyển dụng</Link>
                <Link>Quan hệ cổ đông</Link>
              </Stack>
            </Grid>
            <Grid items xs={3}>
              <Stack direction="column">
                <Typography>Thông tin khuyến mãi</Typography>
                <Link>Giới thiệu</Link>
                <Link>Tin tức</Link>
                <Link>Tin khuyến mãi</Link>
                <Link>Tuyển dụng</Link>
                <Link>Quan hệ cổ đông</Link>
              </Stack>
            </Grid>
            <Grid items xs={3}>
              <Typography>Thanh toán an toàn</Typography>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Styled>
  );
};

export default Footer;
