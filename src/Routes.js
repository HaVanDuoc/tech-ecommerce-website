import { Accessory, Laptop, Mobile, PC, Tablet, Watch } from "./pages";
import Home from "~/pages/Home_v2";

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
