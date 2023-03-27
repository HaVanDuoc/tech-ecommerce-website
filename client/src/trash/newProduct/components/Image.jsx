import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const UploadImage = () => {
  const [image, setImage] = useState(null);

  // Khi setAvt ảnh sẽ được lưu tạm vào bộ nhớ
  // khi chuyển sang ảnh khác buộc phải xóa ảnh cũ đi tránh lãng phí bộ nhớ
  // clean up
  React.useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image);
    };
  }, [image]);

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file); // file is a obj. Add props `preview` contains URL temporary

    setImage(file);
  };


  return (
    <Box>
      {/* <Button variant="contained" component="label">
        Upload
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={handlePreviewImage}
        />
      </Button> */}
      {/* {image && <img src={image.preview} alt="" width="300px" />} */}
    </Box>
  );
};

export default UploadImage;
