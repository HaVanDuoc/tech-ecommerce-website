import { Accessory, Laptop, Mobile, PC, Tablet, Watch } from "./pages";
import Home from "~/pages/Home_v2";
import AdminLayout from "./admin/layouts";
import {
  DatabaseAdmin,
  HomeAdmin,
  NewProductAdmin,
  NewUserAdmin,
  ProductAdmin,
  ProductListAdmin,
  UserAdmin,
  UserListAdmin,
} from "./admin/pages";

export const publicRoutes = [
  { path: "/", page: Home },
  { path: "/dien-thoai", page: Mobile },
  { path: "/tablet", page: Tablet },
  { path: "/laptop", page: Laptop },
  { path: "/phu-kien", page: Accessory },
  { path: "/dong-ho", page: Watch },
  { path: "/pc", page: PC },
];

export const privateRoutes = [
  // admin routes
  { path: "/admin", page: HomeAdmin, layout: AdminLayout },
  { path: "/admin/users", page: UserListAdmin, layout: AdminLayout },
  { path: "/admin/user/:userId", page: UserAdmin, layout: AdminLayout },
  { path: "/admin/newUser", page: NewUserAdmin, layout: AdminLayout },
  { path: "/admin/products", page: ProductListAdmin, layout: AdminLayout },
  {
    path: "/admin/product/:productId",
    page: ProductAdmin,
    layout: AdminLayout,
  },
  { path: "/admin/newProduct", page: NewProductAdmin, layout: AdminLayout },
  { path: "/admin/database", page: DatabaseAdmin, layout: AdminLayout },
];
