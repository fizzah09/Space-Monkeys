import expressRouter from "express";
import { promptGPT, promptDeepseek } from "../controllers/prompt.controller.js";

const router = expressRouter();

router.post("/gpt", promptGPT);
router.post("/deepseek", promptDeepseek);

export default router