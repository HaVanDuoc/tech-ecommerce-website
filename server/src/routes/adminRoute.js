const databaseControllers = require("../controllers/adminControllers/databaseControllers")
const displayControllers = require("../controllers/adminControllers/display")
const router = require("express").Router()

router.post("/", (req, res) => res.status(200).json({ msg: "Admin Page" }))

// ---- Display
router.post("/display/category/newCategory", displayControllers.createNewCategory)
router.get("/display/category/:categoryId", displayControllers.getCategory)
router.put("/display/category/:categoryId", displayControllers.updateCategory)
router.post("/display/brand/newBrand", displayControllers.createNewBrand)
router.post("/display/updateCategory/:categoryId/setBrandForCategories", displayControllers.setBrandForCategories)
router.get("/display/category/updateCategory/:categoryId/selectedBrands", displayControllers.selectedBrands)

// Database
router.post("/database/newCategory", databaseControllers.createNewCategory) // Create new category
router.post("/database/newStatus", databaseControllers.createNewStatus) // Create new status
router.post("/database/newRole", databaseControllers.createNewRole) // Create new role

module.exports = router
