import { Accessory, Laptop, Mobile, PC, Tablet, Watch } from "./pages";
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
import Home from "./pages/Home_v3";
import Banner from "./admin/pages/banner";
import DisplayCategory from "./admin/pages/display/category";
import NewCategory from "./admin/pages/display/category/NewCategory";
import UpdateCategory from "./admin/pages/display/category/UpdateCategory";
import HeadPhone from "./pages/Headphone";
import Sim from "./pages/Sim";
import WashingMachine from "./pages/WashingMachine";
import Tivi from "./pages/Tivi";
import Fridge from "./pages/Frigde";
import Product from "./pages/Product";

export const publicRoutes = [
  { path: "/", page: Home },
  { path: "/dien-thoai", page: Mobile },
  { path: "/tablet", page: Tablet },
  { path: "/laptop", page: Laptop },
  { path: "/phu-kien", page: Accessory },
  { path: "/dong-ho", page: Watch },
  { path: "/pc", page: PC },
  { path: "/tai-nghe", page: HeadPhone },
  { path: "/dong-ho", page: Watch },
  { path: "/sim", page: Sim },
  { path: "/may-giat", page: WashingMachine },
  { path: "/tivi", page: Tivi },
  { path: "/tu-lanh", page: Fridge },
  { path: "/product/:productName", page: Product },
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

  // Display routes
  {
    path: "/admin/display/banner",
    page: Banner,
    layout: AdminLayout,
  },
  {
    path: "/admin/display/category",
    page: DisplayCategory,
    layout: AdminLayout,
  },
  {
    path: "/admin/display/category/newCategory",
    page: NewCategory,
    layout: AdminLayout,
  },
  {
    path: "/admin/display/category/updateCategory/:categoryId",
    page: UpdateCategory,
    layout: AdminLayout,
  },

  // Database routes
  {
    path: "/admin/product/:productId",
    page: ProductAdmin,
    layout: AdminLayout,
  },
  { path: "/admin/database", page: DatabaseAdmin, layout: AdminLayout },
  { path: "/admin/database/categories", page: categories, layout: AdminLayout },
];
