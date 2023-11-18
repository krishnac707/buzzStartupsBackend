import express from "express"
import { InvestorBasicFormDetail, UpdateInvestor, addInterestedStartup, allStartupOverView, getInterestedStartup, getSingleStartupInfo, getSingleStartupInterestedDetail, getYourBasicInvestorProfile, investorKycDocument, investorPancardDoc, investorPassportDoc } from "../controllers/Investor.controllers.js"
import multer from 'multer';
import path from 'path';

const router = express.Router()

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/update-kyc-aadharcard-investor-data', upload.fields([{ name: 'aadharFront' }, { name: 'aadharBack' }]), investorKycDocument);
router.put('/update-kyc-passport-investor-data', upload.fields([{ name: 'passportFront' }, { name: 'passportBack' }]), investorPassportDoc);
router.put('/update-kyc-pancard-investor-data', upload.single('panDoc'), investorPancardDoc);

router.post("/investor-fill-basic-detail", InvestorBasicFormDetail)
router.post("/investor-basic-detail", getYourBasicInvestorProfile)
router.put("/update-investor-data", UpdateInvestor)
router.get("/get-single-startup-overview",getSingleStartupInfo)
router.get("/get-all-startup-overview-data",allStartupOverView)
router.post("/add-interested-startup-detail",addInterestedStartup)
router.get("/get-interested-startup-detail",getInterestedStartup)
router.post("/get-single-interested-startup-detail",getSingleStartupInterestedDetail)

export default router;
