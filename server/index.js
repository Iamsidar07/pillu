import express from "express";
import * as dotenv from "dotenv"
import Cors from "cors"
import connectDB from "./mongodb/connect.js";
import PostSchema from "./mongodb/models/Post.js";
import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"

dotenv.config()

const app=express();
app.use(Cors())
app.use(express.json({ limit: "50mb" }))

app.use("/api/v1/post",postRoutes);
app.use("/api/v1/dalle",dalleRoutes);
const startServer=()=>{
    console.log(process.env.MONGODB_URL)
    try {
        connectDB(process.env.MONGODB_URL)
        app.get("/", async (req, res) => {
            res.send("Hello world from Pillu.")
        })
        app.listen(8080, () => console.log("Server is running"))
    } catch (error) {
        console.error(error)
    }
}

startServer();