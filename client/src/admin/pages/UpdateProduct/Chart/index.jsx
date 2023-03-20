import { Box } from "@mui/material";
import React from "react";
import Chart from "~/admin/components/chart/Chart";
import { productData } from "~/admin/dummyData";

const Chart_v1 = () => {
  return (
    <Box>
      <Chart data={productData} dataKey="Sales" title="Sales Performance" />
    </Box>
  );
};

export default Chart_v1;
