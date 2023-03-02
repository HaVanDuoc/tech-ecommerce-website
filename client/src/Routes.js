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
import categories from "./admin/pages/database/categories";
import UpdateProduct from "./admin/pages/UpdateProduct";

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
  //#region ADMIN ROUTES

  // Home routes
  { path: "/admin", page: HomeAdmin, layout: AdminLayout }, // Home

  // User routes
  { path: "/admin/users", page: UserListAdmin, layout: AdminLayout }, // User
  { path: "/admin/user/update/:userId", page: UserAdmin, layout: AdminLayout }, // Update user
  { path: "/admin/user/newUser", page: NewUserAdmin, layout: AdminLayout }, // Create new user

  // Product routes
  { path: "/admin/products", page: ProductListAdmin, layout: AdminLayout }, // Products
  {
    path: "/admin/product/newProduct",
    page: NewProductAdmin,
    layout: AdminLayout,
  }, // Create new product
  {
    path: "/admin/product/update/:productId",
    page: UpdateProduct,
    layout: AdminLayout,
  }, // Update product

  // Database routes
  {
    path: "/admin/product/:productId",
    page: ProductAdmin,
    layout: AdminLayout,
  },
  { path: "/admin/database", page: DatabaseAdmin, layout: AdminLayout },
  { path: "/admin/database/categories", page: categories, layout: AdminLayout },
];
