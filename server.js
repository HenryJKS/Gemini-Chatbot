const PORT = 8000;
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Config for Google Cloud API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/chat-bison-001:generateMessage?key=${GEMINI_API_KEY}`;

// Route for the chatbot
app.get("/prompt/:text", async (req, res) => {
  // text is the user's input
  const text = req.params.text;

  // payload is the request body for the Google Cloud API
  const payload = {
    prompt: {
      messages: [
        {
          content: text,
        },
      ],
    },
    temperature: 0.1,
    candidate_count: 1,
  };

  // Send a POST request to the Google Cloud API
  const response = await fetch(LANGUAGE_MODEL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  // Send the response from the Google Cloud API to the frontend
  const data = await response.json();
  console.log(data);
  res.send(data);
});

app.listen(PORT, () => console.log(`Listing  on port ${PORT}`));
