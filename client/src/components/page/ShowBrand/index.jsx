import { Container, Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "~/utils/axiosInstance";

const ShowBrand = ({ currentPage }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      let response = await axiosInstance({
        method: "post",
        url: "/client/showBrand",
        data: { currentPage },
      });

      setBrands(response.data.data);
    };

    fetch();
  }, [currentPage]);

  return (
    <Fragment>
      {Array.isArray(brands) && brands.length > 0 && (
        <Container maxWidth={"lg"} disableGutters>
          <Grid container spacing={2}>
            {brands.map((item, index) => (
              <Grid item xs={1.5} key={index}>
                <Link
                  to={item.link}
                  style={{
                    width: "100%",
                    minHeight: "40px",
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "8px 17px",
                    overflow: "hidden",

                    "&::hover": {
                      borderColor: "dodgerblue",
                    },
                  }}
                >
                  <img src={item.logo} alt={item.name} width="100%" />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};

export default ShowBrand;
