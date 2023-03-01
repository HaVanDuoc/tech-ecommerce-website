const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");
const adminController = require("../controllers/adminController");

const router = require("express").Router();

// router.use(verifyToken);

// router.use(verifyRole.isAdmin);

router.post("/", (req, res) => res.status(200).json({ msg: "Admin Page" }));

// User
router.get("/users", adminController.getAllUser); // List users
router.get("/user/:userId", adminController.getUser); // Get a user
router.post("/user/newUser", adminController.createNewUser); // Create new user
router.put("/user/:userId", adminController.updateUser); // Update a user
router.delete("/user/:userId", adminController.deleteUser); // Delete a user

// Product
router.get("/products", adminController.getListProduct); // List products
router.post("/product/newProduct", adminController.createNewProduct); // Create new products
router.get("/product/newProduct/listCategory", adminController.getListCategory); // List category
router.post(
  "/product/newProduct/listSelectBrand",
  adminController.getListSelectBrand
); // List brand

// Database
router.post("/database/newCategory", adminController.createNewCategory); // Create new category
router.post("/database/newStatus", adminController.createNewStatus); // Create new status
router.post("/database/newRole", adminController.createNewRole); // Create new role

// Role
router.get("/roles", adminController.getListRole);

module.exports = router;
