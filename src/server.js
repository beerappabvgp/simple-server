import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
const port = 5000;
import userRouter from "./routes/userRoutes.js";

const mongo_url = "mongodb+srv://beerappabharathb:Ij3kwygvXY9TDtxO@cluster0.qs3tg.mongodb.net/user-management?retryWrites=true&w=majority&appName=Cluster0";


const connectToDB = async () => {
    await mongoose.connect(mongo_url);
    console.log("Connected to the mongoDB ");
}

connectToDB(); 


app.get("/videos", (req, res) => {
    console.log("executed .... ");
    res.send(["video1","video2","video3"]);
});


app.use("/users", userRouter);


app.listen(port);

// get, post, update, delete