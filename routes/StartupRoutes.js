import express from "express"
import { StartupBasicDetailForm, addStartupFunding, getFundingDetail, getStartupAdvisorDetails, getStartupExistingInvestorDetails, getStartupFounderDetails, getTeamSizeDetails, getYourBasicStartupProfile, postExistingInvestorDetails, postPitchDeckDoc, postStartupAdvisorDetails, postStartupFinalProjection, postStartupFounderDetails, postStartupTeamSize, removeAdvisorDetail, removeStartupExistingInvestorDetail, removeTeamSizeDetail, removeTeamStartupFounderDetail, updateFundingDetails, updateStartupCompanyDetail } from "../controllers/startup.controllers.js";
import multer from 'multer';
import path from 'path';

const router = express.Router()

// const storageDocument = multer.diskStorage({
//     destination: './uploads',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
// });
const storageDocument = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === '.pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const uploadDocument = multer({ storage: storageDocument, fileFilter });

router.post("/startup-pitch-deck-document", uploadDocument.array('pitchFile', 10), postPitchDeckDoc)
router.post("/startup-final-projection-doc", uploadDocument.array('docFile', 10), postStartupFinalProjection)

router.post("/startup-team-size-detail",postStartupTeamSize)
router.post("/startup-fill-basic-details", StartupBasicDetailForm)
router.put("/update-startup-company-data",updateStartupCompanyDetail)
router.post("/startup-basic-detail", getYourBasicStartupProfile)
router.post("/startup-funding-detail", addStartupFunding)
router.put("/update-startup-funding-detail", updateFundingDetails)
router.get("/get-startup-funding-detail", getFundingDetail)
router.post("/add-startup-team-data", postStartupFounderDetails)
router.post("/add-startup-advisor-data", postStartupAdvisorDetails)
router.post("/add-startup-existing-investor-data", postExistingInvestorDetails)
router.get("/get-startup-team-size-data",getTeamSizeDetails)
router.get("/get-startup-team-founder-detail",getStartupFounderDetails)
router.get("/get-startup-team-advisor-detail",getStartupAdvisorDetails)
router.get("/get-startup-team-existing-investor-detail",getStartupExistingInvestorDetails)
router.delete("/remove-startup-team-size/:id",removeTeamSizeDetail)
router.delete("/remove-startup-founder-detail/:id",removeTeamStartupFounderDetail)
router.delete("/remove-startup-advisor-detail/:id",removeAdvisorDetail)
router.delete("/remove-startup-interest-investor-detail/:id",removeStartupExistingInvestorDetail)

export default router;
