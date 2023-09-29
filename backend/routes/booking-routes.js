const express = require("express");
const { newBooking,deleteBooking, getBookingById } = require("../controllers/booking-controller");

const bookingRouter = express.Router();
bookingRouter.post("/:id",getBookingById);
bookingRouter.post("/", newBooking);
bookingRouter.delete("/:id",deleteBooking);

module.exports = bookingRouter;