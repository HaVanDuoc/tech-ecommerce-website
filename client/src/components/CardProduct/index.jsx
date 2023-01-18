import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";

const StyledCard = styled(Box)(({ theme }) => ({
  "& .MuiPaper-root": {
    boxShadow: "none !important",
  },

  "& img": {
    paddingTop: theme.spacing(2),
  },

  "& :hover": {
    "& .nameProduct": {
      color: theme.palette.primary.main,
    },
  },
}));

const CardProduct = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <StyledCard>
      <Card>
        <CardActionArea align="center">
          <CardMedia
            component="img"
            minHeight="140"
            image={PF + "assets/products/iphone-12-256gb-(20).jpg"}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              className="nameProduct"
              gutterBottom
              component="div"
              align="center"
              fontWeight={500}
            >
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
            {/* <Button
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
            </Button> */}
          </Box>
        </CardActionArea>
      </Card>
    </StyledCard>
  );
};

export default CardProduct;
