import express  from "express"
import { zosMarketAnalysisAi } from "../controllers/zosAi.controllers.js";

const router = express.Router()

router.post("/buzzstartups-chat-report", zosMarketAnalysisAi)

export default router;
