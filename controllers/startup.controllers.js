import StartupMultiStepFormModal from "../modal/StartupMultiStepForm.modal.js";
import jwt from 'jsonwebtoken';
import startupFundingDetailModal from "../modal/startupFundingDetail.modal.js";
import kycDocumentModal from "../modal/kycDocument.modal.js";
import startupTeamModal from "../modal/startupTeam.modal.js";
import startupAdvisorDetailModal from "../modal/startupAdvisorDetail.modal.js";
import startupExistingInvestorModal from "../modal/startupExistingInvestor.modal.js";
import startupPitchDeckModal from "../modal/startupPitchDeck.modal.js";
import startupFinalProjectionDocModal from "../modal/startupFinalProjectionDoc.modal.js";
import startupTeamSizeModal from "../modal/startupTeamSize.modal.js";

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
            userId: userId
        })
        await startupUserBasicDetail.save();
        return res.status(201).json({ success: true, message: "Startup added Successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const getYourBasicStartupProfile = async (req, res) => {
    try {
        const { token } = req.body;
        console.log(token, "50");
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId
        const startupDetail = await StartupMultiStepFormModal.findOne({ userId: userId })
        if (startupDetail) {
            return res.status(200).json({ success: true, startupDetail: startupDetail, startupFormStatus: true })
        }
        return res.status(404).json({ success: false, message: "Startup Profile is not created yet" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const updateStartupCompanyDetail = async (req, res) => {
    try {
        const { token, userData } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "token is required" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        if (userData) {
            const updateStartup = await StartupMultiStepFormModal.findByIdAndUpdate(userData._id, userData, { new: true })
            if (updateStartup) {
                return res.status(201).json({ success: true, StartupDetail: updateStartup, message: "data added successfully" })
            }
        }
        return res.status(404).json({ success: false, message: "Incorrect Detail" });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const addStartupFunding = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        console.log("hello");
        console.log(req.body.startupFundingData, "95");
        const { currencyType, fundingAsk, valuation, minimumTicketSize, commitmentSoFar, capTableEntryFounder, capTableEntryESOP, capTableEntryInvestor } = req.body.startupFundingData
        if (!currencyType || !fundingAsk || !valuation || !minimumTicketSize || !commitmentSoFar || !capTableEntryFounder || !capTableEntryESOP || !capTableEntryInvestor) return res.status(400).json({ success: false, message: "All fields are mandetory..." })
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        if (!token) return res.status(404).json({ success: false, message: "Token is missing" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });

        const userId = decoder?.userId
        const startupCompanyDetails = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompanyDetails._id;
        console.log(startupCompanyId, "112");
        const fundAdd = new startupFundingDetailModal({
            currencyType: currencyType,
            fundingAsk: fundingAsk,
            valuation: valuation,
            minimumTicketSize: minimumTicketSize,
            capTableEntryFounder: capTableEntryFounder,
            capTableEntryESOP: capTableEntryESOP,
            capTableEntryInvestor: capTableEntryInvestor,
            commitmentSoFar: commitmentSoFar,
            startupCompanyId: startupCompanyId
        })

        await fundAdd.save();
        return res.status(201).json({ success: true, startupFundingDetails: fundAdd, message: "Funding detail added Successfully" })
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const updateFundingDetails = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        const { startupFundingData } = req.body;

        console.log(startupFundingData, "105");

        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }

        if (!token) return res.status(404).json({ success: false, message: "Token is missing" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId
        const startupCompanyDetails = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompanyDetails._id;

        const checkStartupFunding = await startupFundingDetailModal.findOne({ startupCompanyId: startupCompanyId })
        if (checkStartupFunding) {
            const updateStartupFundingData = await startupFundingDetailModal.findByIdAndUpdate(checkStartupFunding._id, startupFundingData, { new: true })
            console.log(updateStartupFundingData, "123");
            if (updateStartupFundingData) {
                return res.status(201).json({ success: true, startupFundingDetails: updateStartupFundingData, message: "funding detail updated successfully" })
            }
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const getFundingDetail = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        if (!token) return res.status(404).json({ success: false, message: "Token is missing" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId
        const startupCompanyDetails = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompanyDetails._id;
        const fundingDetail = await startupFundingDetailModal.findOne({ startupCompanyId: startupCompanyId })
        if (fundingDetail) {
            return res.status(200).json({ success: true, fundingDetail: fundingDetail })
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const postStartupFounderDetails = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        const users = req.body;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        if (!token) return res.status(404).json({ success: false, message: "Token is missing" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId
        for (const user of users) {
            if (!user.name || !user.dateOfBirth || !user.emailId || !user.linkedinUrl || !user.currentCity || !user.experience || !user.education || !user.phoneNo) {
                return res.status(404).json({ success: false, message: "Please fill all detail first" })
            }
            // const phoneValidation = /^[0-9]{10}$/;
            // if(!phoneValidation.test(user.phoneNo)){
            //     return res.status(403).json({success:false,message:"Please Enter valid phone number"})
            // }
        }

        const startupCompanyDetails = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompanyDetails._id;

        const isFounderPresent = await startupTeamModal.find({ startupCompanyId: startupCompanyId })
        if (!isFounderPresent.length) {
            const data = new startupTeamModal({
                startupCompanyId: startupCompanyId,
                founderArray: users
            })
            await data.save();
            return res.status(201).json({ success: true, message: "Founder Added Successfully" })
        }
        const updateFounder = await startupTeamModal.findOneAndUpdate({ startupCompanyId: startupCompanyId }, { $push: { founderArray: { $each: users } } }, { new: true })
        if (updateFounder) {
            return res.status(201).json({ success: true, message: "Founder Added Successfully" })
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const postStartupTeamSize = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        const users = req.body;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        if (!token) return res.status(404).json({ success: false, message: "Token is missing" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId

        const startupCompanyDetails = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompanyDetails._id;

        for (const user of users) {
            if (!user.teamName || !user.teamSize) {
                return res.status(404).json({ success: false, message: "Please fill all detail first" })
            }
        }
        const isTeamPresent = await startupTeamSizeModal.find({ startupCompanyId: startupCompanyId })
        if (!isTeamPresent.length) {
            const data = new startupTeamSizeModal({
                startupCompanyId: startupCompanyId,
                teamSizeDetails: users
            })
            await data.save();
            return res.status(201).json({ success: true, message: "Team Added Successfully" })
        }
        const updateTeam = await startupTeamSizeModal.findOneAndUpdate({ startupCompanyId: startupCompanyId }, { $push: { teamSizeDetails: { $each: users } } }, { new: true })
        if (updateTeam) {
            return res.status(201).json({ success: true, message: "Team Added Successfully" })
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const postStartupAdvisorDetails = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        const users = req.body;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        if (!token) return res.status(404).json({ success: false, message: "Token is missing" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId
        for (const user of users) {
            if (!user.name || !user.linkedinUrl) {
                return res.status(404).json({ success: false, message: "Please fill all detail first" })
            }
        }

        const startupCompanyDetails = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompanyDetails._id;

        const isAdvisorPresent = await startupAdvisorDetailModal.find({  startupCompanyId: startupCompanyId })
        console.log(isAdvisorPresent.length);
        if (!isAdvisorPresent.length) {
            const data = new startupAdvisorDetailModal({
                startupCompanyId: startupCompanyId,
                advisorDetails: users
            })
            await data.save();
            return res.status(201).json({ success: true, message: "Advisor Added Successfully" })
        }
        const updateAdvisor = await startupAdvisorDetailModal.findOneAndUpdate({ startupCompanyId: startupCompanyId }, { $push: { advisorDetails: { $each: users } } }, { new: true })
        if (updateAdvisor) {
            return res.status(201).json({ success: true, message: "Advisor Added Successfully" })
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const postExistingInvestorDetails = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        const users = req.body;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        if (!token) return res.status(404).json({ success: false, message: "Token is missing" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId
        for (const user of users) {
            if (!user.name || !user.linkedinUrl) {
                return res.status(404).json({ success: false, message: "Please fill all detail first" })
            }
        }

        const startupCompanyDetails = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompanyDetails._id;

        const isExistingInvestorPresent = await startupExistingInvestorModal.find({  startupCompanyId: startupCompanyId })
        console.log(isExistingInvestorPresent.length);
        if (!isExistingInvestorPresent.length) {
            const data = new startupExistingInvestorModal({
                startupCompanyId: startupCompanyId,
                advisorDetails: users
            })
            await data.save();
            return res.status(201).json({ success: true, message: "Existing Investor Added Successfully" })
        }
        const updateExistingInvestor = await startupExistingInvestorModal.findOneAndUpdate({ startupCompanyId: startupCompanyId }, { $push: { existingInvestorDetails: { $each: users } } }, { new: true })
        if (updateExistingInvestor) {
            return res.status(201).json({ success: true, message: "Existing Investor Added Successfully" })
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const postPitchDeckDoc = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        const { pitchName, pitchDescription } = req.body;
        if (!token || !pitchName || !pitchDescription) return res.status(404).json({ success: false, message: "All field are mandetory" })
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload PDF files' });
        }
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId

        const filePaths = req.files.map((file) => file.path);
        if (filePaths.length == 1) {
            const dataArray = filePaths.map((fileDoc) => ({
                pitchName: pitchName,
                pitchDescription: pitchDescription,
                fileDoc,
            }));
            const checkStartupPitchDeck = await startupPitchDeckModal.find({ userId: userId })
            if (!checkStartupPitchDeck.length) {

                const data = new startupPitchDeckModal({
                    userId,
                    pitchDeckDetails: dataArray
                })
                await data.save();
                return res.status(201).json({ success: true, message: "Pitch Deck Document added successfully" })
            }

            const updatePitchDeck = await startupPitchDeckModal.findOneAndUpdate({ userId: userId }, { $push: { pitchDeckDetails: { $each: dataArray } } }, { new: true })
            if (updatePitchDeck) {
                return res.status(201).json({ success: true, message: "Pitch Deck Document added successfully" })
            }
        }
        if (filePaths.length > 1) {
            const dataArray = filePaths.map((fileDoc, index) => ({
                pitchName: pitchName[index],
                pitchDescription: pitchDescription[index],
                fileDoc,
            }));
            const checkStartupPitchDeck = await startupPitchDeckModal.find({ userId: userId })
            if (!checkStartupPitchDeck.length) {

                const data = new startupPitchDeckModal({
                    userId,
                    pitchDeckDetails: dataArray
                })
                await data.save();
                return res.status(201).json({ success: true, message: "Pitch Deck Document added successfully" })
            }

            const updatePitchDeck = await startupPitchDeckModal.findOneAndUpdate({ userId: userId }, { $push: { pitchDeckDetails: { $each: dataArray } } }, { new: true })
            if (updatePitchDeck) {
                return res.status(201).json({ success: true, message: "Pitch Deck Document added successfully" })
            }
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const postStartupFinalProjection = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        const { docName, docDescription } = req.body;
        if (!token || !docName || !docDescription) return res.status(404).json({ success: false, message: "All field are mandetory" })
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload PDF files' });
        }
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId

        const filePaths = req.files.map((file) => file.path);

        if (filePaths.length == 1) {
            const dataArray = filePaths.map((fileUrl) => ({
                docName: docName,
                docDescription: docDescription,
                fileUrl,
            }));
            const checkStartupProjectionDetail = await startupFinalProjectionDocModal.find({ userId: userId })
            if (!checkStartupProjectionDetail.length) {
                const data = new startupFinalProjectionDocModal({
                    userId,
                    finalProjectionDetails: dataArray
                })
                await data.save();
                return res.status(201).json({ success: true, message: "Final Projection Document added successfully" })
            }
            const updateFinalProjection = await startupFinalProjectionDocModal.findOneAndUpdate({ userId: userId }, { $push: { finalProjectionDetails: { $each: dataArray } } }, { new: true })
            if (updateFinalProjection) {
                return res.status(201).json({ success: true, message: "Final Projection Document added successfully" })
            }
        }
        if (filePaths.length > 1) {
            const dataArray = filePaths.map((fileUrl, index) => ({
                docName: docName[index],
                docDescription: docDescription[index],
                fileUrl,
            }));
            const checkStartupProjectionDetail = await startupFinalProjectionDocModal.find({ userId: userId })
            if (!checkStartupProjectionDetail.length) {

                const data = new startupFinalProjectionDocModal({
                    userId,
                    finalProjectionDetails: dataArray
                })
                await data.save();
                return res.status(201).json({ success: true, message: "Final Projection Document added successfully" })
            }
            const updateFinalProjection = await startupFinalProjectionDocModal.findOneAndUpdate({ userId: userId }, { $push: { finalProjectionDetails: { $each: dataArray } } }, { new: true })
            if (updateFinalProjection) {
                return res.status(201).json({ success: true, message: "Final Projection Document added successfully" })
            }
        }

    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const getTeamSizeDetails = async (req, res) => {
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

        const startupCompanyDetails = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompanyDetails._id;

        const teamSizeDetails = await startupTeamSizeModal.findOne({ startupCompanyId: startupCompanyId })
        return res.status(200).json({ success: true, teamSizeDetails: teamSizeDetails })
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const getStartupFounderDetails = async (req, res) => {
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

        const startupCompanyDetails = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompanyDetails._id;

        const founderDetails = await startupTeamModal.findOne({ startupCompanyId: startupCompanyId })
        return res.status(200).json({ success: true, founderDetails: founderDetails })
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const getStartupAdvisorDetails = async (req, res) => {
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

        const startupCompanyDetails = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompanyDetails._id;

        const advisorDetails = await startupAdvisorDetailModal.findOne({ startupCompanyId: startupCompanyId })
        return res.status(200).json({ success: true, advisorDetails: advisorDetails })
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const getStartupExistingInvestorDetails = async (req, res) => {
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

        const startupCompanyDetails = await StartupMultiStepFormModal.findOne({ userId: userId })
        const startupCompanyId = startupCompanyDetails._id;

        const startupExistingInvestorDetails = await startupExistingInvestorModal.findOne({ startupCompanyId: startupCompanyId })
        return res.status(200).json({ success: true, startupExistingInvestorDetails: startupExistingInvestorDetails })
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const removeTeamSizeDetail = async (req, res) => {
    try {
        const { id } = req.params
        const { teamSizeId } = req.body
        const updatedTeamSize = await startupTeamSizeModal.findByIdAndUpdate(
            id,
            { $pull: { teamSizeDetails: { _id: teamSizeId } } },
            { new: true }
        );

        if (!updatedTeamSize) {
            return res.status(404).json({ success: false, message: 'Team Name not found' });
        }
        return res.status(200).json({ success: true, message: 'Team size deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const removeTeamStartupFounderDetail = async (req, res) => {
    try {
        const { id } = req.params
        const { founderId } = req.body
        const updatedTeamFounder = await startupTeamModal.findByIdAndUpdate(
            id,
            { $pull: { founderArray: { _id: founderId } } },
            { new: true }
        );

        if (!updatedTeamFounder) {
            return res.status(404).json({ success: false, message: 'Founder not found' });
        }
        return res.status(200).json({ success: true, message: 'Founder deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const removeAdvisorDetail = async (req, res) => {
    try {
        const { id } = req.params
        const { startupAdvisorId } = req.body
        const updatedTeamAdvisor = await startupAdvisorDetailModal.findByIdAndUpdate(
            id,
            { $pull: { advisorDetails: { _id: startupAdvisorId } } },
            { new: true }
        );

        if (!updatedTeamAdvisor) {
            return res.status(404).json({ success: false, message: 'Startup Advisor not found' });
        }
        return res.status(200).json({ success: true, message: 'Startup Advisor deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}

export const removeStartupExistingInvestorDetail = async (req, res) => {
    try {
        const { id } = req.params
        const { startupExistingInvestorId } = req.body
        const updatedTeamStartupExistingInvestor = await startupExistingInvestorModal.findByIdAndUpdate(
            id,
            { $pull: { existingInvestorDetails: { _id: startupExistingInvestorId } } },
            { new: true }
        );

        if (!updatedTeamStartupExistingInvestor) {
            return res.status(404).json({ success: false, message: 'Startup Existing Investor not found' });
        }
        return res.status(200).json({ success: true, message: 'Startup Existing Investor deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}