const { Order } = require('../../models/Order');

const getSingleOrder = async(req, res) => {
    try {
        let  {orderId}  =  req.params;
        let order = await Order.findOne({ _id : orderId})
       console.log(orderId)
        if (!order) return res.status(500).json({ success: false, msg: 'No order found' });

        return res.status(200).json({
            success: true,
            msg: 'Order Found',
            order

        })

    } catch (err) {
        return res.status(500).json({ success: false, msg: err.message });
    }
}

module.exports = getSingleOrder;