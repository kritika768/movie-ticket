const express = require("express");
const { getAllUsers, signUp, updateUser, deleteUser, login, getBookingOfUser,getUserById } = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", signUp);
userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteUser);
userRouter.post("/login",login);
userRouter.get("/bookings/:id",getBookingOfUser);

module.exports = userRouter;
