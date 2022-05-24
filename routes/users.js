const router = require("express").Router();
const mongoose = require("mongoose");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const { User } = require("../models/user");

router.get("/", [auth, admin], async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

// router.get("/:id", auth, async (req, res) => {
//   const id = req.params.id;
//   const user = await User.findById(mongoose.Types.ObjectId(id));

//   res.send(user);
// });

router.get("/me", auth, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (!user) return res.send("Not found in the database");

  res.send(user);
});

router.patch("/me", auth, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (!user) return res.send("Not found in the database");

  const updatedUser = await User.findByIdAndUpdate(user._id, req.body);
  res.send(updatedUser);
});

router.patch("/admin", [auth, admin], async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("Not found in the database");

  const updatedUser = await User.findByIdAndUpdate(user._id, req.body);
  res.send(updatedUser);
});

router.post("/", auth, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (user) return res.send("user already exists");

  const newUser = new User({ ...req.body, email: req.user.email });
  await newUser.save();
  res.send(newUser);
});

// router.patch("/:id", auth, async (req, res) => {
//   console.log(req.body);
//   const id = req.params.id;
//   console.log(id, typeof id);
//   const user = await User.findByIdAndUpdate(
//     mongoose.Types.ObjectId(id),
//     req.body
//   );
//   res.send(user);
// });

// router.delete("/:id", auth, async (req, res) => {
//   const id = req.params.id;
//   const user = await User.findByIdAndDelete(mongoose.Types.ObjectId(id));
//   res.send(user);
// });

module.exports = router;
