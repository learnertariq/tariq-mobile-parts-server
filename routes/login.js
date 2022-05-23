const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const user = req.body;
  console.log(user);
  const token = jwt.sign(user, process.env.JWT_SECRET);

  res.header("x-auth-token", token).send(user);
});

module.exports = router;
