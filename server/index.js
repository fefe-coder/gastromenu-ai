// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// ------------------------------------
// CORS: allow local dev + Vercel site
// ------------------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://gastromenu-ai.vercel.app"
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    }
  })
);

app.use(express.json({ limit: "5mb" }));

// ------------------------------------
// OpenAI client
// ------------------------------------
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ------------------------------------
// Health check
// ------------------------------------
app.get("/", (req, res) => {
  res.send("GastroMenu AI backend is running ✔️");
});

// ------------------------------------
// AI: Parse Menu Text → JSON Dishes
// ------------------------------------
app.post("/api/parse-menu", async (req, res) => {
  const { text } = req.body || {};

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Menu text is required." });
  }

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions:
        "You are a restaurant consultant. Convert messy menu text into structured JSON.",
      input: [
        {
          role: "user",
          content: `
Parse this menu text and return JSON.

For each dish, return:
- name
- description (short marketing text)
- category (Starters, Mains, Pizza, Grill, Desserts, Drinks, Other)
- costPrice (number)
- salePrice (≈ costPrice * 3, round to 0.10)

Menu text:
${text}
          `
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "MenuDishes",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              dishes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    category: { type: "string" },
                    costPrice: { type: "number" },
                    salePrice: { type: "number" }
                  },
                  required: ["name", "category", "salePrice"]
                }
              }
            },
            required: ["dishes"]
          }
        }
      }
    });

    const raw = response.output[0].content[0].text;
    const json = JSON.parse(raw);

    res.json(json);
  } catch (error) {
    console.error("Menu AI parse error:", error);
    res.status(500).json({ error: "AI menu parsing failed." });
  }
});

// ------------------------------------
// AI: Chat with Waiter / Menu Assistant
// ------------------------------------
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res
      .status(400)
      .json({ error: "messages is required: [{ role, content }]" });
  }

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions:
        "You are an AI waiter. Be friendly, concise and helpful. If asked about allergens, always advise checking with the staff.",
      input: messages
    });

    const reply = response.output_text;
    res.json({ reply });
  } catch (error) {
    console.error("Chat AI error:", error);
    res.status(500).json({ error: "AI chat failed." });
  }
});

// ------------------------------------
// Start server
// ------------------------------------
app.listen(port, () => {
  console.log(`GastroMenu AI backend listening on port ${port}`);
});
