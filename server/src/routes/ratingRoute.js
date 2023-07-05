const ratingControllers = require("../controllers/ratingControllers")

const router = require("express").Router()

router.get("/getRatingList", ratingControllers.getRatingList)
