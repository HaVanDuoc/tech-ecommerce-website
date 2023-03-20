import { Box, Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonUpload from "./ButtonUpload";

const ImageProduct = () => {
  const [images, setImages] = useState([{ base64: "" }]);
  const [selected, setSelected] = useState([{ base64: null }]);

  const productId = useParams().productId;

  useEffect(() => {
    const fetch = async () => {
      const response = await axios(
        `/admin/product/update/${productId}/getImageList`
      );

      const convertStringToArray = JSON.parse(response.data.data.image);

      setImages(convertStringToArray);
    };

    fetch();
  }, [productId]);

  const handleClick = (index) => {
    setSelected(images[index]);
  };

  return (
    <Styled>
      <Container disableGutters>
        <Box className="changeImage">
          <ButtonUpload />
        </Box>

        <Box className="mainImage">
          <img
            src={selected.base64 ? selected.base64 : images[0].base64}
            alt="Ảnh minh họa sản phẩm"
            style={{ minWidth: 350, minHeight: 350, width: 350 }}
            className="slide"
          />
        </Box>

        <Box className="optionImage">
          {Array.isArray(images) &&
            images.length > 0 &&
            images.map((image, index) => {
              return (
                <img
                  height={"100%"}
                  src={image.base64}
                  alt=""
                  key={index}
                  style={
                    image === selected
                      ? {
                          border: "3px solid dodgerblue",
                          opacity: 1,
                        }
                      : {
                          border: "3px solid transparent",
                          opacity: 0.5,
                        }
                  }
                  onClick={() => handleClick(index)}
                />
              );
            })}
        </Box>
      </Container>
    </Styled>
  );
};

export default ImageProduct;

const Styled = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",

        "&:hover": {
          ".changeImage": {
            height: "50px",
            transition: "all .4s ease-in-out",
          },
        },

        ".changeImage": {
          position: "absolute",
          top: 0,
          width: "100%",
          height: "0",
          overflow: "hidden",
          transition: "all .4s ease-in-out",
        },

        ".mainImage": {
          width: "100%",
          // height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },

        img: {
          // width: "100%",
          // height: "100%",
        },

        ".optionImage": {
          width: "100%",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      {children}
    </Box>
  );
};
