import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import say from "say";
import cors from "cors";
 
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const port = process.env.PORT || 5000;
const app = express();
  
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));



app.get('/',(req,res)=>{
  res.send("welcome to backend")
})
app.post("/chat", async (req, res) => {
  try {
    const { msg } = req.body;
    console.log(msg);

    const generationConfig = {
      maxOutputTokens: 200,
    };

    const model = genAI.getGenerativeModel(
      { model: "gemini-pro" },
      generationConfig
    );

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: msg }],
        },
        {
          role: "model",
          parts: [
            {
              text: `You are a girl virtual Ai assistant.
          you will always reply with a JSON array of messages.
          With a maximum of 3 messages.
          Each message has a text, explanation, conclusion.`,
            },
          ],
        },
      ],
    });

    const result = await chat.sendMessage(msg);
    const response = result.response;
    const jsonString = response.candidates[0].content.parts[0].text;
    const jsonStartIndex = jsonString.indexOf("[");
    const jsonEndIndex = jsonString.lastIndexOf("]");
    const jsonContent = jsonString.substring(jsonStartIndex, jsonEndIndex + 1);
    const parts = JSON.parse(jsonContent);
    const firstText = parts[0].text;

    console.log(firstText);

    res.json({ text: firstText });
  } catch (error) {
    console.error("Error:", error);
      const toSpeak = error;
      const utterance = new SpeechSynthesisUtterance(toSpeak);
       const voices = window.speechSynthesis.getVoices();
       const femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('female'));
        utterance.voice = femaleVoice || voices[0];
       speechSynthesis.speak(utterance);

     res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
