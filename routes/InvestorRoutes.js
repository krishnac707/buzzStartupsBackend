import express from "express"
import { InvestorBasicFormDetail, getYourBasicInvestorProfile } from "../controllers/Investor.controllers.js"

const router = express.Router()

router.post("/investor-fill-basic-detail", InvestorBasicFormDetail)
router.post("/investor-basic-detail",getYourBasicInvestorProfile)


export default router;
