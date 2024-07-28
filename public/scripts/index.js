
const express = require("express");
const cors = require("cors"); // Import the cors middleware
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

const openai = new OpenAI(process.env.OPEN_AI_KEY);

app.post("/book-summarizer", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
            { role: 'system', content: 'Please summarize the reviews of the book.' },
            { role: 'user', content: prompt }
            ]
        });

        return res.status(200).json({
            success: true,
            data: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`Server listening on port ${port}`)
);
