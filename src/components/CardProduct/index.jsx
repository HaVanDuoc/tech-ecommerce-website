import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";

const CardProduct = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Card>
      <CardActionArea align="center">
        <CardMedia
          component="img"
          minHeight="140"
          image={PF + "assets/products/iphone-12-256gb-(20).jpg"}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div" align="center">
            OPPO A57 128GB
          </Typography>
          <Typography
            variant="h6"
            color="crimson"
            fontWeight={600}
            align="center"
          >
            4.490.000đ
          </Typography>
          <Typography
            variant="h12"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            5.0 <StarIcon fontSize="small" />
          </Typography>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Button
            size="small"
            sx={{
              backgroundColor: "crimson",
              color: "white",
              "&:hover": {
                backgroundColor: "crimson",
                color: "white",
              },
            }}
          >
            Thêm vào giỏ hàng
          </Button>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default CardProduct;
