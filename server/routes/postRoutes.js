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
    return Math.ceil(Math.random() * 11);
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
    const { name, prompt, photos,photo, numberOfImages } = req.body;
    const randomId = getRandomNumber();
    const profilePhoto = `https://api.multiavatar.com/${randomId}.png`;

    console.log({profilePhoto,randomId,photos,photo})
    try {

        //upload all photos to the cloudinary
        // const photosUrl = [];

        // Upload all photos to Cloudinary
        const photoUploadPromises = photos.map(async (element) => {
            const photoUrl = await cloudinary.uploader.upload(element);
            console.log({ photoUrl });
            return photoUrl.url;
        });


        
        const photosUrl = await Promise.all(photoUploadPromises);

        const image = await cloudinary.uploader.upload(photo);


        console.log({photosUrl})
        const newPost = await Post.create({
            name,
            prompt,
            photo:image.url,
            photos:photosUrl,
            profilePhoto: profilePhoto,
            numberOfImages,
        })
        console.log(newPost, profilePhoto, photosUrl)
        

        res.status(200).json({ success: true, data: newPost })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error
        })
    }
})



export default router;