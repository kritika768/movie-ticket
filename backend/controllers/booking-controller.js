const { default: mongoose, mongo } = require("mongoose");
const Bookings = require("../models/Bookings");
const Movie = require("../models/Movie");
const Users = require("../models/User");

const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  let booking;
  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await Users.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie not found with given Id" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found with given id" });
  }
  try {
    const bookingDate = new Date(date);

    // Create the booking object
    booking = new Bookings({
      movie,
      date: bookingDate, // Set the 'date' field with the Date object
      seatNumber,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();
    // booking = await booking.save();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }
  return res.status(201).json({ booking });
};

const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected error" });
  }
  return res.status(200).json({ booking });
};

const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("user movie");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};

module.exports = { newBooking, getBookingById, deleteBooking };
