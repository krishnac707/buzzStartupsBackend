import express  from "express"
import { StartupBasicDetailForm, getYourBasicStartupProfile } from "../controllers/startup.controllers.js";

const router = express.Router()

router.post("/startup-fill-basic-details",StartupBasicDetailForm)
router.post("/startup-basic-detail",getYourBasicStartupProfile)

export default router;

