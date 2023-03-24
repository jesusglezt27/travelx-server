const router = require("express").Router();
const {isAuthenticated} = require("../middleware/jwt.middleware")
const {createItinerary,getAllItinerary,getById,updateItinerary,deleteItinerary} = require("../controllers/itinerary.controller")

router.post("/addItinerary",isAuthenticated, createItinerary )
router.get("/list",isAuthenticated, getAllItinerary )
router.get("/detail/:id",isAuthenticated, getById)
router.patch("/edit/:id",updateItinerary)
router.delete("/remove/:id",deleteItinerary)

module.exports = router;