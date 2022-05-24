const { User } = require("../models/user");

const admin = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  if (!user)
    return res
      .status(403)
      .send("Forbidden. Permission denied or user not found");

  if (!user.isAdmin)
    return res.status(403).json("Forbidden. Permission denied");

  next();
};

module.exports = admin;
