const { getShipmentRate }  = require('../../topship');

const getShipmentRates = async(req, res) => {
    try { 
        let {senderCity, sendercountryCode, countryCode, cityName, totalWeight } = req.body
       let shipmentDetail = {
               senderDetails: {
                 cityName:senderCity,
                 countryCode:sendercountryCode
                },
               receiverDetails: {
                 cityName,
                 countryCode
                },
               totalWeight
       }
 let promise = getShipmentRate(shipmentDetail);
        
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
 