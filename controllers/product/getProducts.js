const { Product } = require("../../models/Product");
const db = require("../../firebase/index")

const getAllProducts = async (req, res) => {
  try {
    // const allProducts = await Product.find({})
    //   .populate("author")
    //   .populate({
    //     path: "comments",

    //     options: { sort: { _id: -1 } },
    //     populate: {
    //       path: "user",
    //     },
    //   });
      const docRef = db.collection('Notifications').doc('alovelace');
      await docRef.set({
        msg: "Hey welcome to nuncio",
        recieverPushToken: "ddshvgyydqwyy6dqw67yqw7eqw777wqqjh",
        title: "Welcome",
        type:"accountCreated"
      });

    // if (!allProducts)
    //   return res.status(500).json({ success: false, msg: "No products found" });

    // return res.status(200).json({
    //   success: true,
    //   msg: "All products",
    //   allProducts,
    // });
  } catch (err) {
    console.log(err)
    // return res.status(500).json({ success: false, msg: err.message });
  }
};

module.exports = getAllProducts;
