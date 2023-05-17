const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");
const userControllers = require("../controllers/adminControllers/userControllers");
const productControllers = require("../controllers/adminControllers/productControllers");
const databaseControllers = require("../controllers/adminControllers/databaseControllers");
const displayControllers = require("../controllers/adminControllers/display");
const { listBrand } = require("../controllers/adminControllers/admin");
const router = require("express").Router();

// router.use(verifyToken);

// router.use(verifyRole.isAdmin);

router.post("/", (req, res) => res.status(200).json({ msg: "Admin Page" }));
router.get("/listBrand", listBrand);

// User
// router.post("/user/newUser", userControllers.createNewUser); // Create new user
// router.get("/users", userControllers.getAllUser); // List users
router.get("/user/:userId", userControllers.getUser); // Get a user
// router.put("/user/:userId", userControllers.updateUser); // Update a user
// router.delete("/user/:userId", userControllers.deleteUser); // Delete a user
router.get("/user/newUser/listRoles", userControllers.getListRole);

// Product
router.post("/product/newProduct", productControllers.createNewProduct); // Create new products
router.get("/product/:productId", productControllers.getProduct); // Get a product
router.put("/product/update/:productId", productControllers.updateProduct); // update product
router.delete("/product/:productId", productControllers.deleteProduct); // Delete a product
router.get("/product/newProduct/listCategory", productControllers.getListCategory); // List category
router.post("/product/newProduct/listSelectBrand", productControllers.getListSelectBrand); // List brand

// ---- Display
router.get("/display/category", displayControllers.listCategories);
router.post("/display/category/newCategory", displayControllers.createNewCategory);
router.get("/display/category/:categoryId", displayControllers.getCategory);
router.put("/display/category/:categoryId", displayControllers.updateCategory);
router.get("/display/brand", displayControllers.listBrand);
router.post("/display/brand/newBrand", displayControllers.createNewBrand);
router.post("/display/updateCategory/:categoryId/setBrandForCategories", displayControllers.setBrandForCategories)
router.get("/display/category/updateCategory/:categoryId/selectedBrands", displayControllers.selectedBrands)
router.get("/display/brand/:brandId", displayControllers.getBrand);
router.put("/display/brand/update/:brandId", displayControllers.updateBrand)

// Database
router.post("/database/newCategory", databaseControllers.createNewCategory); // Create new category
router.post("/database/newStatus", databaseControllers.createNewStatus); // Create new status
router.post("/database/newRole", databaseControllers.createNewRole); // Create new role

module.exports = router;
