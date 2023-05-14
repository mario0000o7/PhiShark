import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    console.log("Generating text...")
    console.log(req.body.text)
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.text,
        max_tokens: 70,
        temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}