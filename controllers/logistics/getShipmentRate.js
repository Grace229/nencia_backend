const { getShipmentRate }  = require('../../topship');
const {Cart} = require('../../models/Cart')

const getShipmentRates = async(req, res) => {
    try { 
        let {senderCity, senderCountryCode, countryCode, cityName, totalWeight } = req.body
 let promise = getShipmentRate(req.body);     
promise.then(
  response => {
  let states = response.data;
  return res.status(201).json({
    success: true,
    msg: 'get shipment rate successfully',
    states
  });
  },
  error => console.log(`Error: ${error.message}`)
);

} catch (err) {
  return res.status(500).json({msg: err.message});
}
}
module.exports = getShipmentRates;
 