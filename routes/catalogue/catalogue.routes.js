const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/authjwt");
const upload = require("../../config/multerSetup");
const createCatalogue = require("../../controllers/catalogue/createCatalogue");


router.route(
  "/create-catalogue").post(verifyToken,
  upload.array("photos"),
  createCatalogue
);

module.exports = router;
