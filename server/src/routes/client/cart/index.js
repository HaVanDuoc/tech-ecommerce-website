const {
  decreaseQuantity,
} = require("../../../controllers/client/cart/decreaseQuantity");
const {
  deleteCartItem,
} = require("../../../controllers/client/cart/deleteCartItem");
const { getCart } = require("../../../controllers/client/cart/getCart");
const {
  increaseQuantity,
} = require("../../../controllers/client/cart/increaseQuantity");

const router = require("express").Router();

router.post("/", getCart);
router.post("/increase", increaseQuantity);
router.post("/decrease", decreaseQuantity);
router.delete("/delete", deleteCartItem);

module.exports = router;
