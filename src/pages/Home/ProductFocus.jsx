import {
  Box,
  Container,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import CarouselProduct from "./CarouselProduct";

const Option = styled(Container)(({ theme }) => ({
  margin: "30px auto",
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProductFocus = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Option disableGutters>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "center !important",
              },
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Sản phẩm mới" {...a11yProps(0)} />
            <Tab label="Sản phẩm bán chạy" {...a11yProps(1)} />
            <Tab label="Sản phẩm phổ biến" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CarouselProduct />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Option>
  );
};

export default ProductFocus;
