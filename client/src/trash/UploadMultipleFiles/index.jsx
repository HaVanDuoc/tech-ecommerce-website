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

const UploadMultipleFiles = ({ props, name }) => {
  const [selected, setSelected] = useState({
    files: [],
    imagesPreviewUrl: [],
  });

  const handleChange = (e) => {
    let files = e.target.files;
    let selected = {
      files: [],
      imagesPreviewUrl: [],
    };

    Object.values(files).forEach((file) => {
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        selected.files.push(e.target.result);
        selected.imagesPreviewUrl.push(e.target.result);
      };
    });

    props.setFieldValue(name, selected.files);
    setSelected(selected);
  };

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
        {selected.imagesPreviewUrl.map((item, index) => (
          <ImageListItem key={index}>
            <img src={item} alt="" loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>

      {/* {selected.imagesPreviewUrl.le && (
        // <img
        //   src={image.imagePreviewUrl}
        //   alt=""
        //   style={{
        //     height: "400px",
        //     borderRadius: "10px",
        //     zIndex: 1,
        //   }}
        // />

        
      )} */}

      <FormHelperText>
        <ErrorMessage name={name} />
      </FormHelperText>
    </Box>
  );
};

export default UploadMultipleFiles;
