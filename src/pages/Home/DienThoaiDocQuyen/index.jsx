import { Box, Container, styled, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { SlickProduct } from "~/components";
import TitleSecondary from "../components/TitleSecondary";

const Styled = styled(Box)(({ theme }) => ({}));

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

const DienThoaiDocQuyen = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Styled>
      <Container maxWidth="lg" disableGutters>
        <TitleSecondary>Điện thoại độc quyền</TitleSecondary>
        <Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ bgcolor: "#fff" }}>
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example"
              >
                <AntTab label="Sansung" />
                <AntTab label="Oppo" />
                <AntTab label="Xiaomi" />
                <AntTab label="Vivo" />
              </AntTabs>
              <TabPanel value={value} index={0}>
                <SlickProduct />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <SlickProduct />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <SlickProduct />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <SlickProduct />
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Container>
    </Styled>
  );
};

export default DienThoaiDocQuyen;
