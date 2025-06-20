import axios from "axios";

export async function askLifeHub(messages: any[]) {
  const model = process.env.AI_MODEL || "llama3-70b-8192";
  const apiKey = process.env.GROQ_API_KEY!;
  const baseURL = "https://api.groq.com/openai/v1/chat/completions";

  const response = await axios.post(
    baseURL,
    {
      model,
      messages,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}