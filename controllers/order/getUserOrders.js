const { Order } = require("../../models/Order");

const getUserOrders = async (req, res) => {
    try {
        let { userID } = req.params;
        let order = await Order.find({ orderOwner: userID }).populate('orderOwner').populate('products.product').populate('products.vendorId').populate('address');
        if (!order)
          return res.status(500).json({ success: false, msg: "No Order Found" });

        return res.status(200).json({
          success: true,
          msg: "successfully found orders",
          order,
        });
      } catch (err) {
        console.log(err);
      }
};

module.exports = getUserOrders;
