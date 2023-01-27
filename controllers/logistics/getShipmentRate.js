const { getShipmentRate }  = require('../../topship');
const {Cart} = require('../../models/Cart')

const getShipmentRates = async(req, res) => {
    try { 
        const { cartId } = req.params;
        let cart = await Cart.findOne({ _id: cartId }).populate('cartOwner').populate('products.product').populate('products.vendorId').populate('address')
       console.log(cart)
        // let {senderCity, senderCountryCode, countryCode, cityName, totalWeight } = req.body
       let object ={
        
                senderCity,
                 senderCountryCode,
                 cityName : cart.address.city,
                 countryCode : cart.address.country,
               totalWeight
    }
 let promise = getShipmentRate(object);     
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
 