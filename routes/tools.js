const router = require("express").Router();
const mongoose = require("mongoose");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const { Tool } = require("../models/tool");

router.get("/", async (req, res) => {
  const queryObj = {};

  const tools = await Tool.find(queryObj).sort({ _id: -1 }).exec();
  res.send(tools);
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const tool = await Tool.findById(mongoose.Types.ObjectId(id));

  res.send(tool);
});

router.post("/", auth, async (req, res) => {
  const tool = new Tool(req.body);

  await tool.save();
  res.send(tool);
});

// router.patch("/:id", auth, async (req, res) => {
//   const id = req.params.id;
//   const tool = await Tool.findByIdAndUpdate(
//     mongoose.Types.ObjectId(id),
//     req.body
//   );
//   res.send(tool);
// });

router.delete("/:id", [auth, admin], async (req, res) => {
  const id = req.params.id;
  const tool = await Tool.findByIdAndDelete(mongoose.Types.ObjectId(id));
  res.send(tool);
});

module.exports = router;
