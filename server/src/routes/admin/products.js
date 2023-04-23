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

router.post("/getProducts", getListProducts);
router.post("/", createNewProduct);
router.put("/updateDetails", updateDetails);

module.exports = router;
