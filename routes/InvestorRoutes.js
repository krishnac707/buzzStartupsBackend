import express from "express"
import { InvestorBasicFormDetail, UpdateInvestor, getYourBasicInvestorProfile } from "../controllers/Investor.controllers.js"
import multer from 'multer';

const app = express();
const router = express.Router()
const upload = multer({ dest: 'uploads/' })
app.use('/uploads',express.static('uploads'))

router.post("/investor-fill-basic-detail", InvestorBasicFormDetail)
router.post("/investor-basic-detail",getYourBasicInvestorProfile)
// router.put("/update-investor-data",upload.single('InvestorProfileImage'),UpdateInvestor)
// router.put("/investor-doc-image",upload.single(''))

export default router;
