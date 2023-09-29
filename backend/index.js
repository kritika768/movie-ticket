const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user-routes");
const adminRouter = require("./routes/admin-routes");
const movieRouter = require("./routes/movie-routes");
const bookingRouter = require("./routes/booking-routes");
require("dotenv").config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/bookings", bookingRouter);

mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("Error connecting to mongodb", error);
  });

app.use(express.urlencoded({ extended: true }));
app.listen("8000", () => {
  console.log("server started");
});
