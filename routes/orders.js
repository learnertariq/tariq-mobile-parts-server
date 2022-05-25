const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { Order } = require("../models/order");
const { Tool } = require("../models/tool");

router.get("/", auth, async (req, res) => {
  const queryObj = { email: req.user.email };

  const orders = await Order.find(queryObj);
  res.send(orders);
});

router.get("/admin", [auth, admin], async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(mongoose.Types.ObjectId(id));

  res.send(order);
});

router.post("/", auth, async (req, res) => {
  const bodyCopy = req.body;
  const tool = await Tool.findById(mongoose.Types.ObjectId(bodyCopy.toolId));
  tool.availableQuantity = tool.availableQuantity - bodyCopy.quantity;
  const total = tool.price * parseInt(bodyCopy.quantity);

  const order = new Order({
    ...bodyCopy,
    total,
  });

  await order.save();
  await tool.save();
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
  // const order = await Order.findByIdAndDelete(mongoose.Types.ObjectId(id));
  const order = await Order.findByIdAndDelete(mongoose.Types.ObjectId(id));
  const tool = await Tool.findById(order.toolId);

  if (tool) {
    tool.availableQuantity = tool.availableQuantity + order.quantity;
    await tool.save();
  }

  res.send(order);
});

module.exports = router;
