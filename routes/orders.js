const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const { Order } = require("../models/order");
const { Tool } = require("../models/tool");

router.get("/", auth, async (req, res) => {
  const queryObj = { email: req.user.email };

  const order = await Order.find(queryObj);
  const tool = await Tool.findById(mongoose.Types.ObjectId(order.tool));
  res.send(order);
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(mongoose.Types.ObjectId(id));

  res.send(order);
});

router.post("/", auth, async (req, res) => {
  const bodyCopy = req.body;
  const tool = await Tool.findById(mongoose.Types.ObjectId(bodyCopy.toolId));
  const total = tool.price * parseInt(bodyCopy.quantity);

  const order = new Order({
    ...bodyCopy,
    total,
  });

  await order.save();
  res.send(order);
});

router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const order = await Order.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    req.body
  );
  res.send(order);
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const order = await Order.findByIdAndDelete(mongoose.Types.ObjectId(id));
  res.send(order);
});

module.exports = router;
