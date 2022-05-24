const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const { Review } = require("../models/review");

router.get("/", async (req, res) => {
  const queryObj = {};

  const reviews = await Review.find(queryObj).sort({ _id: -1 }).exec();
  res.send(reviews);
});

router.post("/", auth, async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.send(review);
});

// router.patch("/:id", auth, async (req, res) => {
//   const id = req.params.id;
//   const review = await Review.findByIdAndUpdate(
//     mongoose.Types.ObjectId(id),
//     req.body
//   );
//   res.send(review);
// });

// router.delete("/:id", auth, async (req, res) => {
//   const id = req.params.id;
//   const review = await Review.findByIdAndDelete(mongoose.Types.ObjectId(id));
//   res.send(review);
// });

module.exports = router;
