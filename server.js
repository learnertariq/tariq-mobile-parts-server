const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");

const rootRouter = require("./routes/root");
const loginRouter = require("./routes/login");
const reviewsRouter = require("./routes/reviews");
const toolsRouter = require("./routes/tools");
const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");

// import middlewares
const errorsMiddleware = require("./middlewares/errors");
const accessHeaders = require("./middlewares/headers");

const app = express();
if (app.get("env") !== "production") {
  require("dotenv").config();
}

// Connecting to database
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1oxkl.mongodb.net/parts-db?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connected to mongoose"));

// middlewares
app.use(accessHeaders);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const stripe = require("stripe")(process.env.STRIPE_SECRET);
// routes
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.use("/", rootRouter);
app.use("/login", loginRouter);
app.use("/reviews", reviewsRouter);
app.use("/tools", toolsRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);
app.use(errorsMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
