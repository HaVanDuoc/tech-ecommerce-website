import { PhotoCamera } from "@mui/icons-material";
import {
  Box,
  FormHelperText,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { ErrorMessage } from "formik";
import React, { useState } from "react";

const UploadFile = ({ props, name }) => {
  const [fileList, setFileList] = useState([]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    file.isUploading = true;

    // convert file to base64
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    file.base64 = fileReader;

    // upload file
    const formData = new FormData();
    formData.append(file.name, file, file.name);

    setFileList([...fileList, file]);
  };

  // const handleChange = (e) => {
  //   setSelected(e.target.files);

  //   const files = selected ? [...selected] : [];
  //   const data = new FormData();

  //   files.forEach((file, i) => {
  //     data.append(`image-${i}`, file.name, file);
  //   });
  //   console.log("data", data);
  // };

  return (
    <Box position="relative">
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          padding: 2,
          border: "1px dashed #999",
          borderRadius: "10px",
          zIndex: 99,
        }}
      >
        <input
          multiple
          name={name}
          hidden
          accept="image/*"
          type="file"
          onChange={handleChange}
        />
        <PhotoCamera />
      </IconButton>

      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {fileList?.imagesPreviewUrl?.map((item, index) => (
          <ImageListItem key={index}>
            <img src={item} alt="" loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>

      <FormHelperText>
        <ErrorMessage name={name} />
      </FormHelperText>
    </Box>
  );
};

export default UploadFile;
