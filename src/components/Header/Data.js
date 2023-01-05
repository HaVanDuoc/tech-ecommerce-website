import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import WatchIcon from "@mui/icons-material/Watch";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import LoginIcon from "@mui/icons-material/Login";

export const NavProductData = [
  {
    icon: <PhoneIphoneIcon />,
    name: "Điện thoại",
    navbarProduct: true,
    menuNavbarProduct: true,
    url: "/dien-thoai",
  },
  {
    icon: <TabletMacIcon />,
    name: "Tablet",
    navbarProduct: true,
    menuNavbarProduct: true,
    url: "/tablet",
  },
  {
    icon: <LaptopMacIcon />,
    name: "Laptop",
    navbarProduct: true,
    menuNavbarProduct: true,
    url: "/laptop",
  },
  {
    icon: <HeadphonesIcon />,
    name: "Phụ kiện",
    navbarProduct: true,
    menuNavbarProduct: true,
    url: "/phu-kien",
  },
  {
    icon: <WatchIcon />,
    name: "Đồng hồ",
    navbarProduct: true,
    menuNavbarProduct: true,
    url: "/dong-ho",
  },
  {
    icon: <ImportantDevicesIcon />,
    name: "Máy tính",
    navbarProduct: true,
    menuNavbarProduct: true,
    url: "/pc",
  },
  {
    icon: <LoginIcon />,
    name: "Đăng nhập",
    navbarProduct: false,
    menuNavbarProduct: true,
    url: "/",
  },
];
