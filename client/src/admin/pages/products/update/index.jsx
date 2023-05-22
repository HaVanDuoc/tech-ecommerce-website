import React, { useEffect } from "react";
import { AdminTitle } from "~/admin/Styled";
import {  Container, Divider, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import ImageProduct from "./ImageProduct";
import DetailProduct from "./DetailProduct";
import axiosInstance from "~/utils/axiosInstance";

const Update = () => {
  const [fetch, setFetch] = React.useState({});

  // Fetch thông tin product
  const productId = useParams().productId;
  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance(`/admin/product/${productId}`);
      setFetch(response.data.data);
    };

    fetch();
  }, [productId]);

  return (
    <Container>
      <Grid container spacing={2}>
        {/* Title */}
        <Grid item xs={12}>
          <Title>
            <AdminTitle>Thông tin sản phẩm</AdminTitle>
          </Title>

          <Divider sx={{ marginBottom: 4, color: "#555" }} />
        </Grid>

        {/* left upload image */}
        <Grid item xs={6}>
          <ImageProduct images={fetch?.images} />
        </Grid>

        {/* right edit detail */}
        <Grid item xs={6}>
          <DetailProduct fetch={fetch} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Update;

const Title = ({ children }) => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {children}
    </Stack>
  );
};
