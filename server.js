
const express = require('express');
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: 'sk-proj-M9T8dcUExqkiKwwxMYjHT3BlbkFJujD0spz93kvHjkY4T2PO'
});

const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const resp = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: req.body.question }
            ]
        });

        res.status(200).json({ message: resp.choices[0].message.content });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
