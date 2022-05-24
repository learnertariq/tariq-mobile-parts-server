const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const { Review } = require("../models/review");

router.get("/", async (req, res) => {
  const queryObj = {};

  const tasks = await Review.find(queryObj);
  res.send(tasks);
});

// router.post("/", auth, async (req, res) => {
//   const bodyCopy = req.body;

//   const task = new Review({
//     name: bodyCopy.name,
//     email: req.user?.email,
//     desc: bodyCopy.desc,
//     complete: bodyCopy.complete || false,
//   });

//   await task.save();
//   res.send(task);
// });

// router.patch("/:id", auth, async (req, res) => {
//   const id = req.params.id;
//   const task = await Review.findByIdAndUpdate(
//     mongoose.Types.ObjectId(id),
//     req.body
//   );
//   res.send(task);
// });

// router.delete("/:id", auth, async (req, res) => {
//   const id = req.params.id;
//   const task = await Review.findByIdAndDelete(mongoose.Types.ObjectId(id));
//   res.send(task);
// });

module.exports = router;
