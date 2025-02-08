import GPTHandler from "../services/aiService/gpt.js";
import DeepSeekHandler from "../services/aiService/deepseek.js";

const promptGPT = async (req, res) => {
  try {
    const { prompt, model } = req.body;
    const handler = new GPTHandler();
    const result = await handler.generate(prompt, model);
    res.json({ success: true, response: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const promptDeepseek = async (req, res) => {
  try {
    const { prompt, model } = req.body;
    const handler = new DeepSeekHandler();
    const result = await handler.generate(prompt, model);
    res.json({ success: true, response: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { promptGPT, promptDeepseek };
