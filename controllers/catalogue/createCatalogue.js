const { Product } = require("../../models/Product");
const cloudinary = require("cloudinary").v2;
const cloudinarySetup = require("../../config/cloudinarySetup");

const createCatalogue = async (req, res) => {
  let { title, price, description } = req.body;

  const files = req.files;
  const urls = [];
  for (const file of files) {
    await cloudinarySetup();
    const uploadedMedia =  await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    })
    urls.push(uploadedMedia.secure_url);
  }


  let newPost = "Catalogue";
  let user = req.user._id;
  const newCatalogue = new Product({
    title,
    productPrice: price,
    description,
    catalogueImage: urls,
    postType: newPost,
    author: user,

  });

  if (!newCatalogue)
    return res
      .status(500)
      .json({ success: false, msg: "An error has occurred" });

  await newCatalogue.save();

  return res.status(201).json({
    success: true,
    msg: "Product created",
    newCatalogue,
  });
};

module.exports = createCatalogue;
