const { Product } = require("../../models/Product");

const getCatalogue = async (req, res) => {
  try {
    let  {vendorId}  =  req.params;
    const userCatalogue = await Product.find({ author : vendorId, postType: 'Catalogue'})
      .populate("author")
    if (!userCatalogue)
      return res.status(500).json({ success: false, msg: "No Catalogue found" });
    return res.status(200).json({
      success: true,
      msg: "All catalogues",
      userCatalogue,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

module.exports = getCatalogue;
