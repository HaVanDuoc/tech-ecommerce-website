import { Box, Container, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormUpload from "./FormUpload";
import axiosInstance from "~/utils/axiosInstance";

const ImageProduct = () => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [reset, setReset] = useState(true);
  const productId = useParams().productId;

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance({
        method: "get",
        url: `/admin/products/update/${productId}/getImageList`,
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      });

      const convertStringToArray = JSON.parse(response.data.data.image);
      setImages(convertStringToArray);
      setSelected(convertStringToArray[0]);
    };

    fetch();
  }, [productId, reset]);

  const handleClick = (index) => {
    setSelected(images[index]);
  };

  return (
    <Styled>
      <Container disableGutters>
        <Box className="changeImage">
          <ButtonUpload>
            <FormUpload imageList={images} reset={reset} setReset={setReset} />
          </ButtonUpload>
        </Box>

        <Box className="mainImage">
          <img
            src={selected?.base64}
            alt="Ảnh minh họa sản phẩm"
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
                  src={image?.base64}
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
          width: "100%",
          height: "0",
          overflow: "hidden",
          transition: "all .4s ease-in-out",
          boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)",
        },

        ".mainImage": {
          width: "100%",
          height: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",

          "& img": {
            width: "auto",
            height: "100%",
          },
        },

        ".optionImage": {
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          height: "100px",
          overflowY: "scroll",
        },
      }}
    >
      {children}
    </Box>
  );
};

const ButtonUpload = styled(Box)(() => ({}));
