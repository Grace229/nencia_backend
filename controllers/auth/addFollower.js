const { User } = require('../../models/User');
const db = require("../../firebase/index")


const addFollower = async (req, res) => {


    let currentUser = req.user._id
    let { vendorId } = req.params;
    let vendor = await User.findOne({_id: vendorId});
    let foundUser = await User.findOne({_id: currentUser})
    if (!vendor) return res.status(500).json({ success: false, msg: 'No Vendor found' });
    let follower = vendor.followers.filter(data => (data == currentUser))
    console.log( vendor)
    const date = new Date();


    if (follower.length == 0) {
            await vendor.updateOne({ $push: { followers: currentUser } });
            await foundUser.updateOne({ $push: { following: vendorId } });
            const docRef = db.collection('Notifications');
            await docRef.add({
              msg: `${foundUser.fullname} is now following you`,
              recieverPushToken: `${vendor.userPushToken}`,
              title: "New Follower",
              type:"newfoll0wer",
              userId: `${vendor._id}`,
              createdAt: `${date}`
            });
        return res.status(201).json({
            success: true,
            msg: ' Successfully Followed Vendor',
        });


    } else {
        await vendor.updateOne({ $pull: { followers: currentUser } });
        await foundUser.updateOne({ $pull: { following: vendorId } });
        const docRef = db.collection('Notifications');
        await docRef.add({
          msg: `${foundUser.fullname} your friend just unfollowed you`,
          recieverPushToken: `${vendor.userPushToken}`,
          title: `${foundUser.fullname} unfollowed you`,
          type:"unfollow",
          userId: `${vendor._id}`,
          createdAt: `${date}`
        });
        return res.status(201).json({
            success: true,
            msg: 'Successfully Unfollowed Vendor  ',
        });
    }

}

module.exports = addFollower;