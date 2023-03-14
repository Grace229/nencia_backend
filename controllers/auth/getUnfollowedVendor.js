const { User } = require('../../models/User');

const getUnfollowedVendors= async(req, res) => {
    try {
        let userId = req.user._id
        let users = await User.find({role: "Vendor",  followers: {$ne: userId}}).populate("followers").populate("address")
        if (!users) return res.status(500).json({ success: false, msg: 'No User found' });
        return res.status(200).json({
          success: true,
          msg: 'get vendors successful',
          users
      });
      }catch(err) {
        console.log(err);
      }
}
module.exports = getUnfollowedVendors;