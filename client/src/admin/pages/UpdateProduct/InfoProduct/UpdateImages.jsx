import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  ImageList,
  ImageListItem,
  Slide,
  styled,
  Typography,
} from "@mui/material";

const ButtonUploadImage = ({ fileList }) => {
  const [open, setOpen] = React.useState(false);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    setImageList(Array.isArray(fileList) ? fileList : []);
  }, [fileList]);

  console.log("imageList", imageList);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true); // Open form
  };

  const handleChange = (e) => {
    const image = e.target.files[0];
    console.log("image", image);
  };

  return (
    <Styled>
      <Box onClick={handleClick} sx={stylesButtonOpenFormUpload}>
        <FileUploadOutlinedIcon />
        <Typography sx={{ marginLeft: 1 }}>Upload hình ảnh</Typography>
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Wrapper>
          <form method="post" encType="multipart/form-data">
            <Header>Cập nhật hình ảnh</Header>

            <Input>
              <input
                name="images"
                class="file-input"
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={handleChange}
              />
              <CloudUploadOutlinedIcon fontSize="large" />
              <Typography>Chọn ảnh để tải lên</Typography>
            </Input>

            <Preview imageList={imageList} />

            <ButtonUpdate type="submit">Update</ButtonUpdate>
          </form>
        </Wrapper>
      </Dialog>
    </Styled>
  );
};

export default ButtonUploadImage;

const ButtonUpdate = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      fullWidth
      variant="contained"
      size="large"
      sx={{ margin: "20px 0" }}
    >
      {children}
    </Button>
  );
};

const Styled = styled(Box)(() => ({
  overflow: "hidden",
}));

const stylesButtonOpenFormUpload = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  width: "100%",
  height: "50px",
  backgroundColor: "#6990F2",
  color: "#fff",
  cursor: "pointer",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Input = ({ children }) => {
  const handleClick = () => {
    document.querySelector(".file-input").click();
  };

  return (
    <Box
      sx={{
        height: "167px",
        display: "flex",
        cursor: "pointer",
        margin: "30px 0",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "5px",
        border: "2px dashed #6990F2",
        color: "#6990F2",
      }}
      onClick={handleClick}
    >
      {children}
    </Box>
  );
};

const Wrapper = ({ children }) => {
  return (
    <Box
      sx={{
        width: "500px",
        background: "#fff",
        borderRadius: "5px",
        padding: "30px",
        boxShadow: "7px 7px 12px rgba(0,0,0,0.05)",
      }}
    >
      {children}
    </Box>
  );
};

const Header = ({ children }) => {
  return (
    <Box
      sx={{
        color: "#6990F2",
        fontSize: "27px",
        fontWeight: "600",
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  );
};

const Preview = ({ imageList }) => {
  return (
    <ImageList sx={{ width: "100%", height: "auto" }} cols={3} rowHeight={164}>
      {Array.isArray(imageList) &&
        imageList.map((item, index) => (
          <ImageListItem
            key={index}
            sx={{
              position: "relative",

              "&:hover": {
                ".delete": {
                  color: "red",
                  opacity: 10,
                  cursor: "pointer",
                  zIndex: "99",
                },

                ".image": {
                  opacity: 0.5,
                },
              },
            }}
          >
            <IconButton
              className="delete"
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
                opacity: 0,
              }}
            >
              <DeleteIcon />
            </IconButton>
            <img className="image" src={item} alt="" loading="lazy" />
          </ImageListItem>
        ))}
    </ImageList>
  );
};
