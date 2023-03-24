const router = require("express").Router();
const {uploadCtrl,uploadMultipleCtrl} = require("../controllers/upload.controller")
const uploadCloud = require("../config/cloudinary")

//una sola
router.post("/single",uploadCloud.single("image"),uploadCtrl   )

//muchas imagenes
router.post("/multiple",uploadCloud.array("images"),uploadMultipleCtrl   )
/**
 *  req.body={
 *      image:[!"3213ij132io"]
 * }
 */


module.exports = router;