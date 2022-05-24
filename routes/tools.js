const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const { Tool } = require("../models/tool");

router.get("/", async (req, res) => {
  const queryObj = {};

  const tool = await Tool.find(queryObj);
  res.send(tool);
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const tool = await Tool.findById(mongoose.Types.ObjectId(id));

  res.send(tool);
});

// router.post("/", auth, async (req, res) => {
//   const bodyCopy = req.body;

//   const tool = new Tool({
//     name: bodyCopy.name,
//     email: req.user?.email,
//     desc: bodyCopy.desc,
//     complete: bodyCopy.complete || false,
//   });

//   await tool.save();
//   res.send(tool);
// });

// router.patch("/:id", auth, async (req, res) => {
//   const id = req.params.id;
//   const tool = await Tool.findByIdAndUpdate(
//     mongoose.Types.ObjectId(id),
//     req.body
//   );
//   res.send(tool);
// });

// router.delete("/:id", auth, async (req, res) => {
//   const id = req.params.id;
//   const tool = await Tool.findByIdAndDelete(mongoose.Types.ObjectId(id));
//   res.send(tool);
// });

module.exports = router;
