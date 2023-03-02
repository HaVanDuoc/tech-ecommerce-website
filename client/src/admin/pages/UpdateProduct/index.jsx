import React from "react";
import Chart from "~/admin/components/chart/Chart";
import { productData } from "~/admin/dummyData";
import { AdminTitle, ButtonCreate, Container, Wrap } from "~/admin/Styled";
import { Box, Grid, Stack } from "@mui/material";
import InfoProduct from "./InfoProduct";
import { useParams } from "react-router-dom";
import { FetchProduct } from "~/helper/fetch";

const UpdateProduct = () => {
  const [data, setData] = React.useState({});

  // Lấy ID từ url hiện tại
  const id = useParams().productId;

  // Fetch thông tin product
  const response = FetchProduct(id);
  React.useEffect(() => {
    setData(response);
  }, [response]);

  return (
    <Container>
      <Stack flexDirection="row" justifyContent="space-between">
        <AdminTitle>Thông tin sản phẩm</AdminTitle>
        <ButtonCreate href="/admin/product/newProduct" />
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InfoProduct data={data} />
        </Grid>
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
