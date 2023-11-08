import express from "express"
import { InvestorBasicFormDetail, UpdateInvestor, getYourBasicInvestorProfile, investorKycDocument, investorPancardDoc, investorPassportDoc } from "../controllers/Investor.controllers.js"
import multer from 'multer';
import path from 'path';

const router = express.Router()

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storage1 = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storagePancard = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const upload1 = multer({ storage: storage1 });
const uploadPancard = multer({ storage: storagePancard });

router.post('/update-kyc-aadharcard-investor-data', upload.fields([{ name: 'aadharFront' }, { name: 'aadharBack' }]), investorKycDocument);
router.put('/update-kyc-passport-investor-data', upload1.fields([{ name: 'passportFront' }, { name: 'passportBack' }]), investorPassportDoc);
router.put('/update-kyc-pancard-investor-data', uploadPancard.single('panDoc'), investorPancardDoc);

router.post("/investor-fill-basic-detail", InvestorBasicFormDetail)
router.post("/investor-basic-detail", getYourBasicInvestorProfile)
router.put("/update-investor-data", UpdateInvestor)

export default router;
