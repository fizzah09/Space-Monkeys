import BaseAIHandler from "./base.js";
import { config } from "./base.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: config.gptApiKey,
  baseURL: config.gptEndpoint,
});

export default class GPTHandler extends BaseAIHandler {
  async generate(prompt, model = "gpt-4o") {
    try {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: prompt }],
      });
      return this.handleResponse(completion);
    } catch (error) {
      console.error("GPT Error:", error.message);
      throw new Error(`GPT API Error: ${error.message}`);
    }
  }
}
