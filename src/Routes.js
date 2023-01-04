import { Accessory, Home, Laptop, Mobile, PC, Tablet, Watch } from "./pages";

export const publicRoutes = [
  { path: "/", page: Home },
  { path: "/dien-thoai", page: Mobile },
  { path: "/tablet", page: Tablet },
  { path: "/laptop", page: Laptop },
  { path: "/phu-kien", page: Accessory },
  { path: "/dong-ho", page: Watch },
  { path: "/pc", page: PC },
];

export const privateRoutes = [];
