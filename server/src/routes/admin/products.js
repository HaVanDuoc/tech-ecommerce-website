const {
  createNewProduct,
} = require("../../controllers/admin/products/createNewProduct");
const {
  getListProducts,
} = require("../../controllers/admin/products/getListProducts");
const {
  updateDetails,
} = require("../../controllers/admin/products/updateDetails");

const router = require("express").Router();

router.post("/getProducts", getListProducts); // Products
router.post("/", createNewProduct); // Create new product
router.put("/updateDetails", updateDetails); // Update detail product

module.exports = router;
