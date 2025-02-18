import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";

const app = express();
// It parses the request body and gives you access to client data at req.body
app.use(express.json());
const port = 5000;

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