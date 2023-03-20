import React, { useState } from "react";
import { AdminTitle, ButtonCreate, Container } from "~/admin/Styled";
import { Box, Divider, Grid, Stack, styled } from "@mui/material";
import InfoProduct from "./InfoProduct";
import { useParams } from "react-router-dom";
import { FetchProduct } from "~/helper/fetch";
import FormUpdate from "./FormUpdate";
import { useDispatch } from "react-redux";
import { open as openForm } from "~/redux/ButtonEditPageUpdateProductInAdmin/actions";
import Chart_v1 from "./Chart";

const UpdateProduct = () => {
  const [data, setData] = React.useState({});
  const dispatch = useDispatch();

  // Lấy ID từ url hiện tại
  const id = useParams().productId;

  // Fetch thông tin product
  const response = FetchProduct(id);
  React.useEffect(() => {
    setData(response);
  }, [response]);

  return (
    <Container>
      <Title>
        <AdminTitle>Thông tin sản phẩm</AdminTitle>
      </Title>

      <Divider sx={{ marginBottom: 5 }} />

      <InfoProduct data={data} />

      <ButtonEdit>
        <ButtonCreate onClick={() => dispatch(openForm())}>Edit</ButtonCreate>

        <FormUpdate />
      </ButtonEdit>

      <Divider />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Chart_v1 />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateProduct;

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

const ButtonEdit = styled(Box)(() => ({
  display: "flex",
  justifyContent: "end",
  marginTop: "20px",
  marginBottom: "20px",
}));
