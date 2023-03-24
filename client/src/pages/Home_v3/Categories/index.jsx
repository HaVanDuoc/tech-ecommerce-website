import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slick from "~/components/Slick";
import { Section } from "../StyledHome";

const Categories = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios("/client/nav");

      setCategory(response.data.data);
    };

    fetch();
  }, []);

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
          {category.length > 0 &&
            category.map((item, index) => (
              <Box key={index}>
                <Link to={item.link}>
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
                      color: "var(--color-text)",

                      "&:hover": {
                        boxShadow: "0 0 0.8125rem 0 rgb(0 0 0 / 5%)",
                      },
                    }}
                  >
                    <img
                      className="item"
                      src={item.illustration}
                      alt=""
                      width="70%"
                    />
                    <Typography marginTop="5px" fontSize="14px">
                      {item.name}
                    </Typography>
                  </Box>
                </Link>
              </Box>
            ))}
        </Slick>
      </Box>
    </Section>
  );
};

export default Categories;
