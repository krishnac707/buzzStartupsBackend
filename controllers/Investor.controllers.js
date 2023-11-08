import jwt from 'jsonwebtoken';
import InvestorMultiStepFormModal from '../modal/InvestorMultiStepForm.modal.js';
import kycDocumentModal from '../modal/kycDocument.modal.js';

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