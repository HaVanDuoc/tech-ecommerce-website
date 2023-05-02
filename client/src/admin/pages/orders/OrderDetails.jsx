import { Box, Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { AdminTitle } from "~/admin/Styled";

const OrderDetails = () => {
  const codeOrder = useParams().codeOrder;

  console.log("codeOrder", codeOrder);

  return (
    <Box sx={{ flex: 4, paddingLeft: 4, paddingRight: 4 }}>
      <AdminTitle>Chi tiết hóa đơn</AdminTitle>

      <Stack>
        
      </Stack>
    </Box>
  );
};

export default OrderDetails;
