import express from "express";
import mongoose from "mongoose";
import {User} from "../models/userSchema.js"
const router = express.Router();

// creates a new user 
router.post("/create", async (req, res) => {
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

// I wanted to get the user details geta api
// 67ab17f9394935559b45c6d1
router.get("/", async (req, res) => {

    // await waits on this line till the db sends the data  
    const users = await User.find();
    console.log(users);
    return res.status(200).json({
        "msg": "Sucessfully fetched all the users in the DB ... ",
        "users": users
    });
});


// deletes the user from the DB 

router.delete("/:id", async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    console.log(user);
    return res.status(200).json({
        "msg": "user deleted successfully ... ",
        "user": user
    });
});


// first step was get the data from the client 
// is to check whether all the fields are present in the body of the request
// we need to check for the datatypes of each field 




export default router;