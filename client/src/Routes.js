import { DatabaseAdmin, HomeAdmin, ProductAdmin, ProductListAdmin, UserAdmin, UserListAdmin } from "./admin/pages"
import AdminLayout from "./admin/layouts"
import Banner from "./admin/pages/banner"
import Update from "./admin/pages/products/update"
import DisplayBrand from "./admin/pages/display/brand"
import categories from "./admin/pages/database/categories"
import NewBrand from "./admin/pages/display/brand/NewBrand"
import DisplayCategory from "./admin/pages/display/category"
import UpdateBrand from "./admin/pages/display/brand/UpdateBrand"
import NewCategory from "./admin/pages/display/category/NewCategory"
import UpdateCategory from "./admin/pages/display/category/UpdateCategory"
import Home from "./pages/Home"
import Cart from "./pages/cart"
import CartLayout from "./layouts/CartLayout"
import CreateNewProduct from "./admin/pages/products/create"
import Products from "./pages/products"
import ProductsLayout from "./layouts/products"
import ProductDetails from "./pages/productDetails"
import ProductDetailsLayout from "./layouts/productDetails"
import Profile from "./pages/profile"
import ProfileLayout from "./layouts/profile"
import Orders from "./admin/pages/orders"
import Edit from "./pages/profile/pages/edit"
import CreateUser from "./admin/pages/users/CreateUser"
import CreateOrder from "./admin/pages/orders/CreateOrder"
import OrderDetails from "./admin/pages/orders/OrderDetails"
import VerifyEmail from "./pages/verifyEmail"
import NoneLayout from "./layouts/NoneLayout"

export const publicRoutes = [
    { path: "/", page: Home },
    { path: "/cart", page: Cart, layout: CartLayout },
    { path: "/profile", page: Profile, layout: ProfileLayout },
    { path: "/profile/edit", page: Edit, layout: ProfileLayout },
    { path: "/:category", page: Products, layout: ProductsLayout },
    {
        path: "/:category/:nameProduct",
        page: ProductDetails,
        layout: ProductDetailsLayout,
    },
    { path: "/verifyEmail", page: VerifyEmail, layout: NoneLayout },
]

export const privateRoutes = [
    //#region ADMIN ROUTES
    { path: "/admin/orders", page: Orders, layout: AdminLayout }, // Orders
    { path: "/admin/orders/:codeOrder", page: OrderDetails, layout: AdminLayout }, // Orders
    { path: "/admin/orders/createOrder/:user_id", page: CreateOrder, layout: AdminLayout }, // create order

    // Home routes
    { path: "/admin", page: HomeAdmin, layout: AdminLayout }, // Home

    // User routes
    { path: "/admin/users", page: UserListAdmin, layout: AdminLayout }, // User
    { path: "/admin/user/update/:userId", page: UserAdmin, layout: AdminLayout }, // Update user
    { path: "/admin/user/newUser", page: CreateUser, layout: AdminLayout }, // Create new user

    // Product routes
    { path: "/admin/products", page: ProductListAdmin, layout: AdminLayout }, // Products
    {
        path: "/admin/product/newProduct",
        // page: NewProductAdmin,
        page: CreateNewProduct,
        layout: AdminLayout,
    }, // Create new product
    {
        path: "/admin/product/update/:productId",
        page: Update,
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
    {
        path: "/admin/display/brand",
        page: DisplayBrand,
        layout: AdminLayout,
    },
    {
        path: "/admin/display/brand/newBrand",
        page: NewBrand,
        layout: AdminLayout,
    },
    {
        path: "/admin/display/brand/update/:brandId",
        page: UpdateBrand,
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
]
