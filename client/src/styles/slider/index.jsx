import "./slider.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";

//
// Customize button prev
//
export function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="prev-arrow " onClick={onClick}>
      <Box className="bg">
        <ArrowBackIosNewIcon />
      </Box>
    </div>
  );
}

//
// Customize button next
//
export function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="next-arrow" onClick={onClick}>
      <Box className="bg">
        <ArrowForwardIosIcon />
      </Box>
    </div>
  );
}
