const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/authjwt");
const upload = require("../../config/multerSetup");
const createCatalogue = require("../../controllers/catalogue/createCatalogue");
const getAllCatalogues = require("../../controllers/catalogue/getCatalogues");


router.route(
  "/create-catalogue").post(verifyToken,
  upload.array("photos"),
  createCatalogue
);
router.route("/get-catalogues").get(getAllCatalogues);


module.exports = router;
