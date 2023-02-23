const { Catalogue } = require("../../models/Catalogue");
const cloudinary = require("cloudinary").v2;
const cloudinarySetup = require("../../config/cloudinarySetup");

const createCatalogue = async (req, res) => {
  let { title, price, description } = req.body;
//   let image = "";
//   const files = req.files;
//   const urls = [];
//   for (const file of files) {
//     cloudinary.uploader.upload(file.path, function(error, result) {
//       if (error) {
//         console.error(error);
//       } else {
//         urls.push(result.secure_url);
//         if (urls.length === files.length) {
//           res.send(urls);
//         }
//       }
//     });
//   }
  const files = req.files;
  const urls = [];
  for (const file of files) {
    await cloudinarySetup();
    const uploadedMedia =  await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    })
    urls.push(uploadedMedia.secure_url);
  }


  let user = req.user._id;
  const newCatalogue = new Catalogue({
    title,
    price,
    description,
    productImage: urls,
    owner: user,
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
