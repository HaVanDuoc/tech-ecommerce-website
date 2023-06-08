import { Box, Container, styled } from "@mui/material"
import React, { useState } from "react"
import ModalUpload from "./ModalUpload"
import { useSelector } from "react-redux"
import { selectorProduct } from "~/redux/productSlice"

const Image = () => {
    const [selected, setSelected] = useState()
    const images = useSelector(selectorProduct)?.data?.images

    const handleClick = (index) => {
        setSelected(images[index])
    }

    return (
        <Styled>
            <Container disableGutters>
                <Box className="changeImage">
                    <ButtonUpload>
                        <ModalUpload />
                    </ButtonUpload>
                </Box>

                <Box className="mainImage">
                    <img
                        src={images && (selected ? selected.path : images[0].path)}
                        alt="Ảnh minh họa sản phẩm"
                        className="slide"
                    />
                </Box>

                <Box className="optionImage">
                    {images &&
                        images.map((image, index) => {
                            return (
                                <img
                                    height={"100%"}
                                    src={image.path}
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
                            )
                        })}
                </Box>
            </Container>
        </Styled>
    )
}

export default Image

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
    )
}

const ButtonUpload = styled(Box)(() => ({}))
