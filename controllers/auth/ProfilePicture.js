const { User } = require('../../models/User');
const cloudinary = require('cloudinary').v2;
const cloudinarySetup = require('../../config/cloudinarySetup');

const addProfilePicture = async (req, res, next) => {
  try {
    let { fullname, phonenumber, email } = req.body;
    let  userId  = req.user._id;
  let image = "";
  if (req.file) {
    await cloudinarySetup();
    const uploadedMedia = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });
    image = uploadedMedia.secure_url;
  }
let objectField = {
  fullname,
  email,
  phonenumber,
  ProfilePicture: image
}
    await User.findByIdAndUpdate(
        { _id: userId }, 
        { $set: objectField }, 
        { new: true }
      );
  
      res.status(201).json({
        success: true,
        msg: 'Profile Picture Saved Successfully',
      })

  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
}
module.exports = addProfilePicture;
