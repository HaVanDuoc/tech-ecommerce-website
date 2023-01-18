import { Box, Divider, Stack, styled } from "@mui/material";
import React from "react";
import ButtonAlert from "./ButtonAlert";
import ButtonCard from "./ButtonCard";
import ButtonHome from "./ButtonHome";
import ButtonProfile from "./ButtonProfile";

const RightItemsWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  // flexGrow: 1,
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
}));

const RightItems = () => {
  return (
    <RightItemsWrapper>
      <Stack flexDirection="row">
        <ButtonHome />
        <ButtonAlert />
        <ButtonProfile />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ mx: 1 }}
        />
        <ButtonCard />
      </Stack>
    </RightItemsWrapper>
  );
};

export default RightItems;
