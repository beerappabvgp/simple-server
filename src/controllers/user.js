import { User } from "../models/userSchema.js";

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

    // store the data in the db
    const user = await User.create(req.body);
    console.log("user created successufully .... ");
    res.status(201).json({
      msg: "User has been created successfully ... ",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // await waits on this line till the db sends the data
    const users = await User.find();
    console.log(users);
    return res.status(200).json({
      msg: "Sucessfully fetched all the users in the DB ... ",
      users: users,
    });
  } catch (error) {
    console.log(error);
  }
}


export const getUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
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
}

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
    const deletedUser = await User.findByIdAndDelete(id);
    console.log(user);
    return res.status(200).json({
      msg: "user deleted successfully ... ",
      user: deletedUser,
    });
  } catch (error) {
    console.log(error);
  }
}

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
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({
        msg: "User updated successfully ... ",
        user: updatedUser
    })
  } catch (error) {
    console.log(error);
  }
}