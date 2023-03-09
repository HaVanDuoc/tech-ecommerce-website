import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import {
  formatCost,
  formatDiscount,
  formatVND,
  getPrice,
} from "~/helper/format";
import { PF } from "~/__variables";
import { dummyData } from "../dummyData";
import { Section, Title } from "../StyledHome";

const TodaySuggestions = () => {
  return (
    <Section>
      <Title>Gợi ý hôm nay</Title>
      <Grid container spacing={2}>
        {dummyData.map((item, index) => (
          <Grid item xs={2.4} key={index}>
            <Card
              sx={{
                paddingTop: 3,
                paddingBottom: 3,
                cursor: "pointer",

                ".cardMedia img": {
                  marginTop: "10px",
                  transition: "all .3s ease-in-out",
                },

                "&:hover": {
                  ".cardMedia img": {
                    transition: "all .3s ease-in-out",
                    marginBottom: "10px",
                  },

                  ".nameProduct": {
                    transition: "all .3s ease-in-out",
                    color: "dodgerblue",
                  },
                },
              }}
            >
              <Box
                className="cardMedia"
                sx={{
                  height: 250,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={PF + "/assets/products/" + item.image}
                  alt=""
                  width="100%"
                />
              </Box>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  fontSize={16}
                  component="div"
                  className="nameProduct"
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  fontSize={18}
                  fontWeight={500}
                  color="#ba000d"
                >
                  {formatVND(getPrice(item.cost, item.discount))}
                </Typography>
                <Stack
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                >
                  <Typography>{formatCost(formatVND(item.cost))}</Typography>
                  <Typography marginLeft={1} color="crimson" fontWeight={500}>
                    {formatDiscount(item.discount)}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default TodaySuggestions;
