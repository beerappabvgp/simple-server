import express from "express";
import mongoose from "mongoose";
import { User } from "../models/userSchema.js";
import { createUser, getAllUsers, getUserData, deleteUser, updateUser, signin } from "../controllers/user.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
const router = express.Router();



const middleware1 = (req, res, next) => {
    console.log("router level middleware  ... ");
    next();
}

// Only users who had signed in with our application can acess this route
router.get("/dashboard", userMiddleware,  (req, res) => {
    console.log("req.id: ", req.user);
    return res.status(200).json({
        msg: "Dashboard page ....",
    });
});

router.use(middleware1);
// creates a new user
// http://localhost:5000/users/create => post
router.post("/create", createUser);

router.post("/signin", signin);

// I wanted to get the user details get api

// http://localhost:5000/users/ => get
router.get("/", getAllUsers);

// I wanted single user data
router.get("/:id", getUserData);

// deletes the user from the DB
// http://localhost:5000/users/id => delete
// http://localhost:5000/users/345 => delete
router.delete("/:id", deleteUser);

// http://localhost:5000/users/345 => put
router.put("/:id", updateUser);




export default router;
