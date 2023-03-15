import express from "express"
import * as dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import Post from "../mongodb/models/Post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRETE_KEY

})

function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}

// get all post route 

router.route("/").get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
})

// create post route
router.route("/").post(async (req, res) => {
    const { name, prompt, photo } = req.body;
    const randomId = getRandomNumber();
    const profilePhoto = `https://api.multiavatar.com/${randomId}.png`;
    console.log({profilePhoto,randomId})
    try {
        const photoUrl = await cloudinary.uploader.upload(photo);
       
        const newPost = await Post.create({
            name,
            prompt,
            profilePhoto:profilePhoto,
            photo: photoUrl.url,
        })

        res.status(200).json({ success: true, data: newPost })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
})



export default router;