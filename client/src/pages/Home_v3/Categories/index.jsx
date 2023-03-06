import { Box, Typography } from "@mui/material";
import React from "react";
import Slick from "~/components/Slick";
import { PF } from "~/__variables";
import { Section } from "../StyledHome";
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
    <Section>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignContent: "center",
          borderBottom: "1px solid rgba(0,0,0,.09)",
          paddingLeft: 2,
          paddingBottom: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
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
            <Box key={index}>
              <Box
                className="shake"
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
                  border: "none",

                  "&:hover": {
                    boxShadow: "0 0 0.8125rem 0 rgb(0 0 0 / 5%)",
                  },
                }}
              >
                <img
                  className="item"
                  src={PF + "/assets/categories/" + item.image}
                  alt=""
                  width="70%"
                />
                <Typography marginTop="5px" fontSize="14px">
                  {item.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Slick>
      </Box>
    </Section>
  );
};

export default Categories;
