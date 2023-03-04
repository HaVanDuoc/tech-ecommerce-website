import { Box, Typography } from "@mui/material";
import React from "react";
import Slick from "~/components/Slick";
import { PF } from "~/__variables";
import { categories } from "./dummyData";

const Categories = () => {
  const settings = {
    dot: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    rows: 2,
    slidesPerRow: 10,
  };

  return (
    <Box sx={{ backgroundColor: "white", marginTop: 2, marginBottom: 2 }}>
      <Box
        sx={{
          width: "100%",
          p: 2,
          display: "flex",
          alignContent: "center",
          borderBottom: "1px solid rgba(0,0,0,.05)",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            color: "#4B4453",
            textTransform: "uppercase",
          }}
        >
          Danh mục
        </Typography>
      </Box>

      <Box>
        <Slick settings={settings}>
          {categories.map((item, index) => (
            <Box>
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  cursor: "pointer",
                  borderRight: "1px solid rgba(0,0,0,.05)",
                  borderBottom: "1px solid rgba(0,0,0,.05)",
                  paddingTop: 2,
                  paddingBottom: 2,
                  minHeight: "150px",

                  "&:hover": {
                    boxShadow: "0 0 0.8125rem 0 rgb(0 0 0 / 5%)",
                  },
                }}
              >
                <img
                  src={PF + "/assets/categories/Tivi-128x129.png"}
                  alt=""
                  width="60px"
                />
                <Typography marginTop="5px" fontSize="14px">
                  {item.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Slick>
      </Box>
    </Box>
  );
};

export default Categories;
