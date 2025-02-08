
import dotenv from "dotenv";
dotenv.config();

export const config = {
  gptApiKey: process.env.OPENAI_API_KEY,
  deepseekApiKey: process.env.DEEPSEEK_API_KEY,
  gptEndpoint: "https://api.aimlapi.com/v1",
  deepseekEndpoint: "https://api.deepseek.com/v1/chat/completions",
  timeout: 30000,
};

export default class BaseAIHandler {
  constructor() {
    this.config = config;
  }

  async generate(prompt, model, provider) {
    throw new Error("Not implemented");
  }

  handleResponse(response) {
    return response.choices[0].message.content.trim();
  }
}
