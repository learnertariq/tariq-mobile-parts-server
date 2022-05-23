const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const { Tool } = require("../models/tool");

router.get("/", async (req, res) => {
  const queryObj = {};

  const tasks = await Tool.find(queryObj);
  res.send(tasks);
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const task = await Tool.findById(mongoose.Types.ObjectId(id));

  res.send(task);
});

// router.post("/", auth, async (req, res) => {
//   const bodyCopy = req.body;
//   console.log(req.user);

//   const task = new Tool({
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
//   const task = await Tool.findByIdAndUpdate(
//     mongoose.Types.ObjectId(id),
//     req.body
//   );
//   res.send(task);
// });

// router.delete("/:id", auth, async (req, res) => {
//   const id = req.params.id;
//   const task = await Tool.findByIdAndDelete(mongoose.Types.ObjectId(id));
//   res.send(task);
// });

module.exports = router;
