const router = require("express").Router();
const {isAuthenticated} = require("../middleware/jwt.middleware")
const {editUserCtrl} = require("../controllers/user.controller")
//put
//patch
router.patch("/edit-profile",isAuthenticated ,editUserCtrl )

module.exports = router;