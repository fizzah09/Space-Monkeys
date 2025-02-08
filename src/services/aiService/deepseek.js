import BaseAIHandler from "./base.js";
import { config } from "./base.js";

export default class DeepSeekHandler extends BaseAIHandler {
  async generate(prompt, model = "deepseek-chat") {
    try {
      const response = await axios.post(
        config.deepseekEndpoint,
        {
          model: model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${config.deepseekApiKey}`,
            "Content-Type": "application/json",
          },
          timeout: config.timeout,
        }
      );
      return this.handleResponse(response.data);
    } catch (error) {
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      console.error("DeepSeek Error:", errorMessage);
      throw new Error(`DeepSeek API Error: ${errorMessage}`);
    }
  }
}
