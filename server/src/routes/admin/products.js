const { checkNameProduct } = require("../../controllers/admin/products/checkNameProduct");
const { createNewProduct } = require("../../controllers/admin/products/createNewProduct");
const { getListProducts } = require("../../controllers/admin/products/getListProducts");
const { updateDetails } = require("../../controllers/admin/products/updateDetails");
const verifyToken = require("../../middleware/verifyToken");
const verifyRole = require("../../middleware/verifyRole");
const { getImageList, updateImageList } = require("../../controllers/adminControllers/productControllers");

const router = require("express").Router();

router.post("/getProducts", getListProducts); // Products
router.post("/checkNameProduct", checkNameProduct);
router.get("/update/:productId/getImageList", getImageList);

router.use(verifyToken);
router.use(verifyRole);

router.post("/", createNewProduct); // Create new product
router.put("/updateDetails", updateDetails); // Update detail product
router.put("/update/:productId/updateImageList", updateImageList);

module.exports = router;
