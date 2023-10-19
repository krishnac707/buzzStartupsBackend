import StartupMultiStepFormModal from "../modal/StartupMultiStepForm.modal.js";
import jwt from 'jsonwebtoken';

export const StartupBasicDetailForm = async (req, res) => {
    try {
        const { StartupName, StartupEmail, StartupDate, StartupWebsiteUrl,
            StartupHeadQuarter, StartupState, StartupCity, StartupPincode, StartupStage, StartupBusinessType,
            StartupMultipleSector, StartupRound, StartupPreviousInvestment, StartupKnowAboutUs, StartupTermsAndCondition } = req.body.formData;
        const { token } = req.body;

        if (!StartupName || !StartupEmail || !StartupDate || !StartupWebsiteUrl || !
            StartupHeadQuarter || !StartupState || !StartupCity || !StartupPincode || !StartupStage || !StartupBusinessType || !
            StartupMultipleSector || !StartupRound || !StartupPreviousInvestment || !StartupKnowAboutUs || !StartupTermsAndCondition || !token) return res.status(400).json({ success: false, message: "All fields are mandetory..." })

        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoder) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }
        const userId = decoder.userId

        const startupUserBasicDetail = new StartupMultiStepFormModal({
            StartupName: StartupName,
            StartupEmail: StartupEmail,
            StartupDate: StartupDate,
            StartupWebsiteUrl: StartupWebsiteUrl,
            StartupHeadQuarter: StartupHeadQuarter,
            StartupState: StartupState,
            StartupCity: StartupCity,
            StartupPincode: StartupPincode,
            StartupStage: StartupStage,
            StartupBusinessType: StartupBusinessType,
            StartupMultipleSector: StartupMultipleSector,
            StartupRound: StartupRound,
            StartupPreviousInvestment: StartupPreviousInvestment,
            StartupKnowAboutUs: StartupKnowAboutUs,
            StartupTermsAndCondition: StartupTermsAndCondition,
            userId:userId
        })
        await startupUserBasicDetail.save();
        return res.status(201).json({ success: true, message: "Startup added Successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const getYourBasicStartupProfile = async (req,res) => {
    try{
        const { token } = req.body;
        console.log(token,"50");
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success:false, message: "token not found" });
        const userId = decoder?.userId
        const startupDetail = await StartupMultiStepFormModal.find({userId:userId})
        if(startupDetail.length){
            return res.status(200).json({ success:true, startupDetail: startupDetail,startupFormStatus:true })
        }
        return res.status(404).json({ success:false, message: "Startup Profile is not created yet" });
    }catch(error){
        return res.status(500).json({ success: false, error: error.message })
    }
}