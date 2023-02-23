import React from "react";
import { Card, CardMedia, IconButton, Stack } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

const UploadAvatar = () => {
  return (
    <Stack justifyContent="center">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
      </Card>

      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        sx={{ borderRadius: "0" }}
      >
        <input hidden accept="image/*" type="file" />
        <PhotoCameraOutlinedIcon />
      </IconButton>
    </Stack>
  );
};

export default UploadAvatar;
