const express = require("express");
const getCity = require("../../controllers/logistics/getCities");
const getCountry = require("../../controllers/logistics/getCountries");
const getShipmentRates = require("../../controllers/logistics/getShipmentRate");
const getState = require("../../controllers/logistics/getStates");
const router = express.Router();
// const verifyToken = require("../../middlewares/authjwt");


router.route("/get-countries").get( getCountry);
router.route("/get-states").post( getState);
router.route("/get-cities").post( getCity);
router.route("/get-shipment-rate").post( getShipmentRates);




module.exports = router;

