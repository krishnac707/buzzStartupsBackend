import jwt from 'jsonwebtoken';
import InvestorMultiStepFormModal from '../modal/InvestorMultiStepForm.modal.js';

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
        console.log(decoder,"24");
        const userId = decoder.userId
        const investorUser = new InvestorMultiStepFormModal({
            InvestorName:InvestorName,
            InvestorEmail:InvestorEmail,
            InvestorNumber:InvestorNumber,
            InvestorLinkdinUrl:InvestorLinkdinUrl,
            InvestorCountry:InvestorCountry,
            InvestorCity:InvestorCity,
            InvestorPincode:InvestorPincode,
            InvestorBusinessType:InvestorBusinessType,
            InvestorOrganizationName:InvestorOrganizationName,
            InvestorDesignation:InvestorDesignation,
            InvestorWebsiteUrl:InvestorWebsiteUrl,
            InvestorInvestedStartup:InvestorInvestedStartup,
            InvestorInterestedSector:InvestorInterestedSector,
            InvestorInvestingAmount:InvestorInvestingAmount,
            InvestorKownAboutUs:InvestorKownAboutUs,
            InvestorTermAndCondition:InvestorTermAndCondition,
            userId:userId
        }) 
        await investorUser.save();
        return res.status(201).json({ success: true, message: "Investor added Successfully" })
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const getYourBasicInvestorProfile = async (req,res) => {
    try{
        const { token } = req.body;
        console.log(token,"50");
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success:false, message: "token not found" });
        const userId = decoder?.userId
        const InvestorDetail = await InvestorMultiStepFormModal.find({userId:userId})
        if(InvestorDetail.length){
            return res.status(200).json({ success:true, InvestorDetail: InvestorDetail,InvestorFormStatus:true })
        }
        return res.status(404).json({ success:false, message: "Startup Profile is not created yet" });
    }catch(error){
        return res.status(500).json({ success: false, error: error.message })
    }
}