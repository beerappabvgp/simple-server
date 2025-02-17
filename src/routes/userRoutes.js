import express from "express";
import mongoose from "mongoose";
import { User } from "../models/userSchema.js";
import { createUser, getAllUsers, getUserData, deleteUser, updateUser } from "../controllers/user.js";
const router = express.Router();

// creates a new user
// http://localhost:5000/users/create => post
router.post("/create", createUser);

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
