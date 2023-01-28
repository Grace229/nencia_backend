const { User } = require("../../models/User");
const editPushToken = async (req, res, next) => {
try {
    const { userId } = req.params;
    const update = { $set: req.body };
    const options = { returnOriginal: false };

    const result = await User.findOneAndUpdate(
      { _id: userId },
      update,
      options
    );
    return res.status(201).json({
        success: true,
        msg: "Push Token updated successfully",
        result,
      });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
}
module.exports = editPushToken