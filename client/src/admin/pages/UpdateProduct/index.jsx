import React, { useState } from "react";
import Chart from "~/admin/components/chart/Chart";
import { productData } from "~/admin/dummyData";
import { AdminTitle, ButtonCreate, Container, Wrap } from "~/admin/Styled";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import InfoProduct from "./InfoProduct";
import { useParams } from "react-router-dom";
import { FetchProduct } from "~/helper/fetch";
import FormUpdate from "./FormUpdate";
import { useDispatch } from "react-redux";
import { open as openForm } from "~/redux/ButtonEditPageUpdateProductInAdmin/actions";

const UpdateProduct = () => {
  const [data, setData] = React.useState({});
  const [open, setOpen] = useState(false);
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
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <AdminTitle>Thông tin sản phẩm</AdminTitle>
      </Stack>

      <Divider sx={{ marginBottom: 5 }} />

      <InfoProduct data={data} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <ButtonCreate onClick={() => dispatch(openForm())}>Edit</ButtonCreate>
        <FormUpdate />
      </Box>

      <Divider />

      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Divider />
        <Grid item xs={12}>
          <Box>
            <Chart
              data={productData}
              dataKey="Sales"
              title="Sales Performance"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateProduct;
