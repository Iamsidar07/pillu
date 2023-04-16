import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();
// console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION_ID
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
});



const getOpenAiPrompt=async (userInputPrompt)=>{
    const completion=await openai.createChatCompletion({
         model:"gpt-3.5-turbo",
         messages:[
            {
                 role: "system", content: "I want you to act as a highly experienced photographer. You will use rich and highly artistic language when describing your photo prompts — the prompt must be one sentence long"
            },
            {
                role:"user",content:userInputPrompt   
            }
         ]
    })

    return completion.data.choices[0].message.content;
}


router.route('/').post(async (req, res) => {
    try {
        const { prompt,numberOfImages } = req.body;
        // console.log("creating",prompt);
        const responseData=[];
        // const size=getRandomSize();
        // console.log(size,typeof numberOfImages)
        const openAiEnhancedPrompt=await getOpenAiPrompt(prompt);
        const aiResponse = await openai.createImage({
            prompt:openAiEnhancedPrompt,
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