import express from "express";
import mongoose from "mongoose";
import {User} from "../models/userSchema.js"
const router = express.Router();

router.post("/signup", async (req, res) => {
    console.log("request body", req.body);
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        res.status(400).json({
            "msg": "All fields are required ... "
        });
    } 
    if (typeof(username) !== "string")  {
        res.status(400).json({
            "msg": "username must be a string ... ",
        });
    }
    if (typeof(email) !== "string")  {
        res.status(400).json({
            "msg": "email must be a string ... ",
        });
    }
    if (typeof(password) !== "string")  {
        res.status(400).json({
            "msg": "password must be a string ... ",
        }); 
    }

    // store the data in the db 
    await User.create(req.body);
    console.log("user created successufully .... ");
    res.status(201).json({
        "msg": "User has been created successfully ... "
    });
});



// first step was get the data from the client 
// is to check whether all the fields are present in the body of the request
// we need to check for the datatypes of each field 




export default router;