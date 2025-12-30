import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Method Not Allowed");
  const { prompt } = req.body;
  if (!prompt) return res.status(400).send("Missing prompt");

  try {
    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    });

    const base64 = response.data[0].b64_json;
    res.status(200).json({ base64 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
