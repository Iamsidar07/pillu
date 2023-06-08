import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();
console.log(process.env.OPENAI_ORGANIZATION_ID)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION_ID
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
});

const getOpenAiPrompt=async (form)=>{
    const { subject,description,style,graphics,quality } = form;
    const completion=await openai.createCompletion({
        model:"text-davinci-003",
        prompt:`I want you to act as a highly experienced photographer. You will use rich and highly artistic language when describing your photo prompts based on subject, description, style, graphics and quality from now on.
        ###
        subject: A village
        description: on christmas covered by snow
        style:modern
        graphics:unreal engine
        quality:8k
        prompt:Christmas village, magical, enchanting, wreaths, snow-covered streets, colorful buildings, sparkling, charming, detailed, glittery, shiny, twinkling lights, festive, ornate, traditional, whimsical, Christmastide, highly detailed, hyperrealistic, illustration, Unreal Engine 5,8K
        ###
        subject:${subject}
        description:${description}
        style:${style}
        graphics:${graphics}
        quality:${quality}
        prompt:
        `,
        max_tokens:450,
        temperature:0.7   
    })

    return completion.data.choices[0].text;
}


router.route('/').post(async (req, res) => {
    try {
        const { form } = req.body;
        // console.log("creating",prompt);
        const responseData=[];
        // const size=getRandomSize();
        // console.log(size,typeof numberOfImages)
        const openAiEnhancedPrompt= await getOpenAiPrompt(form);
        console.log(openAiEnhancedPrompt)
        const aiResponse = await openai.createImage({
            prompt:openAiEnhancedPrompt,
            n: form.numberOfImages,
            size:"1024x1024",
            response_format: 'b64_json',
        });
       
        // const image = aiResponse.data.data[0].b64_json;
        console.log({aiResponse})
        aiResponse.data.data.map((item)=>responseData.push(item.b64_json));
        res.status(200).json({photo:responseData[0], photos: responseData });
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
});

export default router;