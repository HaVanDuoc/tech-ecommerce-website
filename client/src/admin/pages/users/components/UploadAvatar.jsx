import React, { useState } from "react";
import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
} from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import Avatar from "react-avatar-edit";

const UploadAvatar = ({ props }) => {
  const [image, setImage] = React.useState(null);

  // For Dialog Avatar
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const AvatarEdit = () => {
    const [preview, setPreview] = useState(null);
    const [src] = useState(null);

    const onClose = () => {
      setPreview(null);
    };

    const onCrop = (view) => {
      setPreview(view);
    };

    // ---Check size file
    // const onBeforeFileLoad = (elem) => {
    //   if (elem.target.files[0].size > 71680) {
    //     alert("Kích thước ảnh quá lớn!");
    //     elem.target.value = "";
    //   }
    // };

    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
      setImage(preview);
      handleClose();
      props.setFieldValue("avatar", preview);
    };

    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle textAlign="center">{"Cập nhật ảnh đại diện"}</DialogTitle>
        <DialogContent>
          <Avatar
            width={500}
            height={500}
            onCrop={onCrop}
            onClose={onClose}
            src={src}
            // onBeforeFileLoad={onBeforeFileLoad} // check size file
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave}>Lưu</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Stack justifyContent="center">
      {image && (
        <CardMedia sx={{ width: "100%", aspectRatio: "1/1" }} image={image} />
      )}

      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        onClick={handleClickOpen}
        sx={image ? StyleUploadButtonSmall : StyleUploadButtonLarge}
      >
        <PhotoCameraOutlinedIcon />
      </IconButton>

      <AvatarEdit />
    </Stack>
  );
};

export default UploadAvatar;

const StyleUploadButtonLarge = {
  borderRadius: 5,
  border: "3px dashed darkblue",
  height: 150,
  aspectRatio: 1 / 1,

  "& svg": {
    width: "2rem",
    height: "2rem",
  },
};

const StyleUploadButtonSmall = {
  borderRadius: 5,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
