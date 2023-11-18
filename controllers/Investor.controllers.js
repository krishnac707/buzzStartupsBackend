import jwt from 'jsonwebtoken';
import InvestorMultiStepFormModal from '../modal/InvestorMultiStepForm.modal.js';
import kycDocumentModal from '../modal/kycDocument.modal.js';
import UserModal from '../modal/User.modal.js';
import StartupMultiStepFormModal from '../modal/StartupMultiStepForm.modal.js';
import startupFundingDetailModal from '../modal/startupFundingDetail.modal.js';
import e from 'express';
import InterestRequestModal from '../modal/InterestRequest.modal.js';

export const InvestorBasicFormDetail = async (req, res) => {
    try {
        const { InvestorName, InvestorEmail, InvestorNumber, InvestorLinkdinUrl, InvestorCountry, InvestorCity,
            InvestorPincode, InvestorBusinessType, InvestorOrganizationName, InvestorDesignation,
            InvestorWebsiteUrl, InvestorInvestedStartup, InvestorInterestedSector, InvestorInvestingAmount, InvestorKownAboutUs,
            InvestorTermAndCondition } = req.body.formData;

        const { token } = req.body;

        if (!InvestorName || !InvestorEmail || !InvestorNumber || !InvestorLinkdinUrl || !InvestorCountry || !InvestorCity ||
            !InvestorPincode || !InvestorBusinessType || !InvestorOrganizationName || !InvestorDesignation ||
            !InvestorWebsiteUrl || !InvestorInvestedStartup || !InvestorInterestedSector || !InvestorInvestingAmount || !InvestorKownAboutUs ||
            !InvestorTermAndCondition || !token) return res.status(400).json({ success: false, message: "All fields are mandetory..." })

        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoder) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }
        console.log(decoder, "24");
        const userId = decoder.userId
        const investorUser = new InvestorMultiStepFormModal({
            InvestorName: InvestorName,
            InvestorEmail: InvestorEmail,
            InvestorNumber: InvestorNumber,
            InvestorLinkdinUrl: InvestorLinkdinUrl,
            InvestorCountry: InvestorCountry,
            InvestorCity: InvestorCity,
            InvestorPincode: InvestorPincode,
            InvestorBusinessType: InvestorBusinessType,
            InvestorOrganizationName: InvestorOrganizationName,
            InvestorDesignation: InvestorDesignation,
            InvestorWebsiteUrl: InvestorWebsiteUrl,
            InvestorInvestedStartup: InvestorInvestedStartup,
            InvestorInterestedSector: InvestorInterestedSector,
            InvestorInvestingAmount: InvestorInvestingAmount,
            InvestorKownAboutUs: InvestorKownAboutUs,
            InvestorTermAndCondition: InvestorTermAndCondition,
            userId: userId
        })
        await investorUser.save();
        return res.status(201).json({ success: true, message: "Investor added Successfully" })
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const getYourBasicInvestorProfile = async (req, res) => {
    try {
        const { token } = req.body;
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId
        const InvestorDetail = await InvestorMultiStepFormModal.findOne({ userId: userId })
        if (InvestorDetail) {
            return res.status(200).json({ success: true, InvestorDetail: InvestorDetail, InvestorId: InvestorDetail.name, InvestorFormStatus: true })
        }
        return res.status(404).json({ success: false, message: "Investor Profile is not created yet" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const UpdateInvestor = async (req, res) => {
    try {
        const { token, InvestorFormDetail } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "token is required" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId
        if (InvestorFormDetail) {
            const updateAboutMe = await InvestorMultiStepFormModal.findByIdAndUpdate(InvestorFormDetail._id, InvestorFormDetail, { new: true })
            if (updateAboutMe) {
                return res.status(201).json({ success: true, InvestorDetail: updateAboutMe, message: "data added successfully" })
            }
        }
        return res.status(404).json({ success: false, message: "Incorrect Detail" });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const investorKycDocument = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        const files = req.files;
        const frontImage = files['aadharFront'][0];
        const backImage = files['aadharBack'][0];
        const frontImagePath = frontImage.path;
        const backImagePath = backImage.path;

        if (!token || !frontImage || !backImage) return res.status(404).json({ success: false, message: "All field are mandetory" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId

        const InvestorUserDoc = new kycDocumentModal({
            aadharFront: frontImagePath,
            aadharBack: backImagePath,
            userId: userId
        })
        await InvestorUserDoc.save();
        return res.status(201).json({ success: true, message: "aadharcard added Successfully" })
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const investorPassportDoc = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }

        const files = req.files;
        const frontImage = files['passportFront'][0];
        const backImage = files['passportBack'][0];
        const frontImagePath = frontImage.path;
        const backImagePath = backImage.path;

        if (!token || !frontImage || !backImage) return res.status(404).json({ success: false, message: "All field are mandetory" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId

        const checkInvestorKycUser = await kycDocumentModal.findOne({ userId: userId })
        if (checkInvestorKycUser) {
            const kycDocCheck = await kycDocumentModal.findByIdAndUpdate(checkInvestorKycUser._id, { passportFront: frontImagePath, passportBack: backImagePath }, { new: true })
            if (kycDocCheck) {
                return res.status(201).json({ success: true, message: "Passport added successfully" })
            }
            return res.status(404).json({ success: false, message: "Incorrect Detail" });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const investorPancardDoc = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        const imageUrl = req.file.path
        if (!token || !imageUrl) return res.status(404).json({ success: false, message: "All field are mandetory" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId

        const checkInvestorKycUser = await kycDocumentModal.findOne({ userId: userId })
        if (checkInvestorKycUser) {
            const kycDocCheck = await kycDocumentModal.findByIdAndUpdate(checkInvestorKycUser._id, { panCard: imageUrl }, { new: true })
            if (kycDocCheck) {
                return res.status(201).json({ success: true, message: "Pancard added successfully" })
            }
            return res.status(404).json({ success: false, message: "Incorrect Detail" });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })

    }
}

export const getSingleStartupInfo = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId

        const startupCompany = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompany._id
        // const startupProfile = await kycDocumentModal.findOne({userId:userId})
        const startupFund = await startupFundingDetailModal.findOne({ startupCompanyId: startupCompanyId })

        const result = {
            startupName: startupCompany.StartupName,
            startupTagline: startupCompany.startupTagline,
            startupValuation: startupFund.valuation,
            startupFundingAsk: startupFund.fundingAsk,
            startupMinimumFunding: startupFund.minimumTicketSize,
            startupCommetmentSoFar: startupFund.commitmentSoFar,
            startupSector: startupCompany.StartupMultipleSector,
            startupStages: startupCompany.StartupStage,
            startupcapTableEntryFounder: startupFund.capTableEntryFounder,
            startupCapTableEntryESOP: startupFund.capTableEntryESOP,
            startupCapTableEntryInvestor: startupFund.capTableEntryInvestor
        }
        return res.status(200).json({ success: true, result: result })
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const allStartupOverView = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId

        const startupCompaniesDetail = await StartupMultiStepFormModal.find({})
        const startupFundingDetail = await startupFundingDetailModal.find({})

        // console.log(startupCompaniesDetail,"245");
        // console.log(startupFundingDetail,"246");

        const resultData = startupCompaniesDetail.map((startupData) => {
            const fundingData = startupFundingDetail.find((funding) => funding.startupCompanyId && funding.startupCompanyId.equals(startupData._id));
            return {
                startupId: startupData._id,
                startupName: startupData.StartupName,
                startupTagline: startupData.startupTagline,
                startupSector: startupData.StartupMultipleSector,
                startupStages: startupData.StartupStage,
                startupValuation: fundingData ? fundingData.valuation : undefined,
                startupFundingAsk: fundingData ? fundingData.fundingAsk : undefined,
                startupMinimumFunding: fundingData ? fundingData.minimumTicketSize : undefined,
                startupCommetmentSoFar: fundingData ? fundingData.commitmentSoFar : undefined,
                startupcapTableEntryFounder: fundingData ? fundingData.capTableEntryFounder : undefined,
                startupCapTableEntryESOP: fundingData ? fundingData.capTableEntryESOP : undefined,
                startupCapTableEntryInvestor: fundingData ? fundingData.capTableEntryInvestor : undefined
            };
        });

        const filteredResultData = resultData.filter(entry =>
            entry.startupFundingAsk !== undefined,
        );
        console.log(filteredResultData);
        return res.status(200).json({ success: true, allStartup: filteredResultData })
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const addInterestedStartup = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        const startupId = req.body.startupId
        console.log(startupId,"283");
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId
        const investorCompany = await InvestorMultiStepFormModal.findOne({ userId: userId })
        if (!investorCompany) {
            return res.status(404).json({ success: false, message: 'InvestorCompany not found' });
        }
        console.log(investorCompany?.startupCompany, "297");
        const targetStartupId = startupId.startupId;
        if (investorCompany.startupCompany.includes(startupId)) {
            return res.status(400).json({ success: false, message: 'You already shown interest in this startup' });
        }
        console.log(investorCompany?.startupCompany, "301");
        investorCompany?.startupCompany.push(startupId)
        console.log(investorCompany?.startupCompany, "303");
        await investorCompany.save();

        const findAdmin = await UserModal.find({ Role: 'Admin' })
        const newInterestInvestor = await InterestRequestModal.create({
            investorCompanyId: investorCompany._id,
            startupCompanyId: targetStartupId,
            userId: findAdmin[0]._id,
        });
        return res.status(200).json({ success: true, investorCompany: investorCompany, message: "Startup added successfully to your portfolio" })

    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const getInterestedStartup = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId

        const investorCompany = await InvestorMultiStepFormModal.findOne({ userId: userId })
        if (!investorCompany) {
            return res.status(404).json({ success: false, message: 'InvestorCompany not found' });
        }

        const startupId = investorCompany.startupCompany
        const startupDetails = await Promise.all(startupId.map(async (startupId) => {
            const singleStartup = await StartupMultiStepFormModal.findById(startupId);
            if (!singleStartup) {
                return null;
            }
            const fundingData = await startupFundingDetailModal.findOne({ startupCompanyId: startupId });
            return {
                startupId: singleStartup._id,
                startupName: singleStartup.StartupName,
                startupTagline: singleStartup.startupTagline,
                startupSector: singleStartup.StartupMultipleSector,
                startupStages: singleStartup.StartupStage,
                startupValuation: fundingData ? fundingData.valuation : undefined,
                startupFundingAsk: fundingData ? fundingData.fundingAsk : undefined,
                startupMinimumFunding: fundingData ? fundingData.minimumTicketSize : undefined,
                startupCommetmentSoFar: fundingData ? fundingData.commitmentSoFar : undefined,
                startupcapTableEntryFounder: fundingData ? fundingData.capTableEntryFounder : undefined,
                startupCapTableEntryESOP: fundingData ? fundingData.capTableEntryESOP : undefined,
                startupCapTableEntryInvestor: fundingData ? fundingData.capTableEntryInvestor : undefined
            };
        }));

        const filteredStartupDetails = startupDetails.filter((startupDetail) => startupDetail !== null);
        return res.status(200).json({ success: true, startupDetails: filteredStartupDetails });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const getSingleStartupInterestedDetail = async (req,res) => {
    try{
        const authorizationHeader = req.headers['authorization'];
        var token;
        const {startupId} = req.body;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });

        const startupCompany = await StartupMultiStepFormModal.findOne({ _id: startupId })
        const startupFund = await startupFundingDetailModal.findOne({ startupCompanyId: startupId })

        const result = {
            startupName: startupCompany.StartupName,
            startupTagline: startupCompany.startupTagline,
            startupLocation:startupCompany.StartupState,
            startupWebsite:startupCompany.StartupWebsiteUrl,
            startupSector: startupCompany.StartupMultipleSector,
            startupHighlights:startupCompany.startupHighlights,
            startupStory:startupCompany.startupStory,
            startupProblemStatement:startupCompany.startupProblemStatement,
            startupSolution:startupCompany.startupSolution,
            startupProduct:startupCompany.startupProducts,
            startupTraction:startupCompany.startupTract,

            startupValuation: startupFund.valuation,
            startupFundingAsk: startupFund.fundingAsk,
            startupMinimumFunding: startupFund.minimumTicketSize,
            startupCommetmentSoFar: startupFund.commitmentSoFar,
            // startupcapTableEntryFounder: startupFund.capTableEntryFounder,
            // startupCapTableEntryESOP: startupFund.capTableEntryESOP,
            // startupCapTableEntryInvestor: startupFund.capTableEntryInvestor
        }
        return res.status(200).json({ success: true, result: result })
    }
    catch(err){
        return res.status(500).json({ success: false, error: err.message })
    }
}