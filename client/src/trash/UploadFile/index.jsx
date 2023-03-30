import { PhotoCamera } from "@mui/icons-material";
import { Box, FormHelperText, IconButton } from "@mui/material";
import { ErrorMessage } from "formik";
import React, { useState } from "react";

const UploadFile = ({ props, name }) => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);

    if (file) {
      reader.onload = (e) => {
        setImage({
          file: e.target.result,
          imagePreviewUrl: e.target.result,
        });
        props.setFieldValue(name, e.target.result); // return file name
      };
    }
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
          // width: "300px",
          minHeight: "400px",
          padding: 2,
          border: "1px dashed #999",
          borderRadius: "10px",
          zIndex: 99,
        }}
      >
        <input
          name={name}
          hidden
          accept="image/*"
          type="file"
          onChange={handleChange}
        />
        {!image && <PhotoCamera />}
        {image && (
          <img
            src={image.imagePreviewUrl}
            alt=""
            style={{
              height: "400px",
              borderRadius: "10px",
              zIndex: 1,
            }}
          />
        )}
      </IconButton>

      <FormHelperText>
        <ErrorMessage name={name} />
      </FormHelperText>
    </Box>
  );
};

export default UploadFile;
