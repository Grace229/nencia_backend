const { User } = require('../../models/User');

const getVendors= async(req, res) => {
    try {
        let user = await User.find({role: "Vendor"}).populate("followers").populate("address")
        if (!user) return res.status(500).json({ success: false, msg: 'No User found' });
        return res.status(200).json({
          success: true,
          msg: 'get vendors successful',
          user
      });
      }catch(err) {
        console.log(err);
      }
}
module.exports = getVendors;