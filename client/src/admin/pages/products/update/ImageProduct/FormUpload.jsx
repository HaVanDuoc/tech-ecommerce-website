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
import { useParams } from "react-router-dom";
import CircularProgressCustomize from "~/components/progress/CircularProgressCustomize";
import { useSnackbar } from "notistack";
import axiosInstance from "~/utils/axiosInstance";

const FormUpload = ({ imageList, reset, setReset }) => {
  const productId = useParams().productId;
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(imageList);
  }, [imageList]);

  const handleSnackBar = (res) => {
    if (res.data.err === 0) {
      enqueueSnackbar(res.data.msg, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 4000,
      });
    } else {
      enqueueSnackbar(res.data.msg, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 4000,
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true); // Open form
  };

  const handleChange = (e) => {
    const images = e.target.files;

    // `images` là 1 object array
    for (let i = 0; i < images.length; i++) {
      let file = images.item(i); // Lấy từng item trong images

      let fileReader = new FileReader();
      fileReader.readAsDataURL(file); // encode về base64

      fileReader.onload = (e) => {
        // Tạo 1 chuỗi duới dạng object lưu fileName, fileSize, fileType và code base64 của image
        let data = {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          base64: e.target.result,
        };
        selected.push(data);

        setSelected([...selected]);
      };
    }
  };

  const handleSubmit = () => {
    const update = async () => {
      // Dữ liệu tải về là `array` nên phải chuyển về lại `string`
      const arrayToString = JSON.stringify(selected);

      setSubmitting(true);

      const response = await axiosInstance({
        method: "put",
        url: `/admin/products/update/${productId}/updateImageList`,
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
        data: { image: arrayToString },
      });

      setSubmitting(false);

      handleSnackBar(response); // response result

      // if don't have error is refresh page
      if (response.data.err === 0) {
        handleClose();
        setReset(!reset);
      }
    };

    update();
  };

  const handleDeletePreview = (image) => {
    setSelected(() => selected.filter((item) => item !== image));
  };

  return (
    <Styled>
      <Box onClick={handleClick} sx={stylesButtonOpenFormUpload}>
        <FileUploadOutlinedIcon />
        <Typography sx={{ marginLeft: 1 }}>Tải hình ảnh</Typography>
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Wrapper>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <Header>Cập nhật hình ảnh</Header>

            <Input>
              <input
                name="images"
                className="file-input"
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={handleChange}
              />
              <CloudUploadOutlinedIcon fontSize="large" />
              <Typography>Chọn ảnh để tải lên</Typography>
            </Input>

            {/* Preview */}
            <ImageList
              sx={{ width: "100%", height: "auto" }}
              cols={3}
              rowHeight={164}
            >
              {selected.map((item, index) => {
                return (
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
                      <DeleteIcon onClick={() => handleDeletePreview(item)} />
                    </IconButton>
                    <img
                      className="image"
                      src={item.base64}
                      alt=""
                      loading="lazy"
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>

            <ButtonUpdate type="submit">
              {isSubmitting ? <CircularProgressCustomize /> : "Cập nhật"}
            </ButtonUpdate>
          </form>
        </Wrapper>
      </Dialog>
    </Styled>
  );
};

export default FormUpload;

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
