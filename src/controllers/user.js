import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    console.log("request body", req.body);
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      res.status(400).json({
        msg: "All fields are required ... ",
      });
    }
    if (typeof username !== "string") {
      res.status(400).json({
        msg: "username must be a string ... ",
      });
    }
    if (typeof email !== "string") {
      res.status(400).json({
        msg: "email must be a string ... ",
      });
    }
    if (typeof password !== "string") {
      res.status(400).json({
        msg: "password must be a string ... ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // store the data in the db
    const user = await User.create({ ...req.body, password: hashedPassword });
    console.log("user created successufully .... ");
    const { password: userPassword, ...rest } = user._doc;
    res.status(201).json({
      msg: "User has been created successfully ... ",
      user: rest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // await waits on this line till the db sends the data
    const users = await User.find().select("-password");
    console.log(users);
    return res.status(200).json({
      msg: "Sucessfully fetched all the users in the DB ... ",
      users: users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (user) {
      return res.status(200).json({
        msg: "Sucessfully fetched  the user",
        user: user,
      });
    } else {
      return res.status(400).json({
        msg: "id does not exist in the database",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        msg: "User id does not exist to delete ... ",
      });
    }
    const deletedUser = await User.findByIdAndDelete(id).select("-password");
    console.log(user);
    return res.status(200).json({
      msg: "user deleted successfully ... ",
      user: deletedUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    console.log(typeof undefined);
    if (typeof username !== "undefined" && typeof username !== "string") {
      res.status(400).json({
        msg: "username must be a string ... ",
      });
    }
    if (typeof email != "undefined" && typeof email !== "string") {
      console.log("inside email");
      console.log(typeof email);
      res.status(400).json({
        msg: "email must be a string ... ",
      });
    }
    if (typeof password != "undefined" && typeof password !== "string") {
      res.status(400).json({
        msg: "password must be a string ... ",
      });
    }
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({
        msg: "id does not exist on the db ... ",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");
    return res.status(200).json({
      msg: "User updated successfully ... ",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
};


// during signin I will send the token to the user from the server
// whenever user sends a request he sends me the token 
// After getting the token i will validate whether the token is valid or not

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password are required ...",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        msg: "User does not exist in the DB ... ",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    // we should never send the password to the client before sending it to client
    // { username, email, password } => { userPassword, { email,  username }}
    const { password: userPassword, ...rest } = user._doc;
    // create a new JWT
    console.log("user is: ", user);
    const token = jsonwebtoken.sign({ id: user._id } , process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("token is: ", token);
    if (isMatch) {
      return res.status(200).json({
        msg: "User signed in successfully ... ",
        user: rest,
        token: token,
      });
    } else {
      return res.status(400).json({
        msg: "Either email or password is incorrect ...",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
