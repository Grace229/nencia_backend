const { Catalogue } = require("../../models/Catalogue");

const getAllCatalogues = async (req, res) => {
  try {
    const allCatalogues = await Catalogue.find({postType: "Catalogue"})
      .populate("author")
    if (!allCatalogues)
      return res.status(500).json({ success: false, msg: "No Catalogue found" });
    return res.status(200).json({
      success: true,
      msg: "All catalogues",
      allCatalogues,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

module.exports = getAllCatalogues;
