import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();
// console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
});

function getRandomSize(){
   const sizes = ['1024x1024', '512x512', '256x256']
    return sizes[Math.floor(Math.random() * 3)]
}


router.route('/').post(async (req, res) => {
    try {
        const { prompt,numberOfImages } = req.body;
        // console.log("creating",prompt);
        const responseData=[];
        // const size=getRandomSize();
        // console.log(size,typeof numberOfImages)
        const aiResponse = await openai.createImage({
            prompt,
            n: numberOfImages,
            size:"1024x1024",
            response_format: 'b64_json',
        });
       
        // const image = aiResponse.data.data[0].b64_json;
        aiResponse.data.data.map((item)=>responseData.push(item.b64_json));
        res.status(200).json({photo:responseData[0], photos: responseData });
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
});

export default router;