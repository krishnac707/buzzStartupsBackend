import UserModal from "../modal/User.modal.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import kycDocumentModal from "../modal/kycDocument.modal.js";

export const Register = async (req, res) => {
    try {
        const { FirstName, LastName, Email, Password, Role } = req.body.userData;
        if (!FirstName || !LastName || !Email || !Password || !Role) return res.status(400).json({ success: false, message: "All fields are mandetory..." })
        const isEmailExist = await UserModal.find({ Email: Email })
        if (isEmailExist.length) {
            return res.status(409).json({ success: false, message: "Email already Exist" });
        }
        const hashPassword = await bcrypt.hash(Password, 10);
        const user = new UserModal({ FirstName, LastName, Password: hashPassword, Email, Role });
        await user.save();
        return res.status(201).json({ success: true, message: "Registration Successful" })
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const Login = async (req, res) => {
    try {

        const { Email, Password, Role } = req.body.userData;
        
        if (!Email || !Password || !Role) return res.status(400).json({ success: false, message: "please fill all details" })
        const user = await UserModal.findOne({ Email: Email });
        if (!user || user?.Role != Role) return res.status(409).json({ success: false, message: "User not found" })
        // if (user.isBlocked) return res.status(404).json({ success: false, message: "Your account is  blocked by admin please contact with us to login" })
        const isPasswordCorrect = await bcrypt.compare(Password, user.Password)
        if (isPasswordCorrect) {
            const userobj = {
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
                userId: user._id,
                Role: user.Role
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2 days' });
            return res.status(200).json({ success: true, message: "Login Successful", user: userobj, token: token })
        }
        return res.status(404).json({ success: false, message: "please check email or password" })

    }
    catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ success: false, message: "token is required" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoder) return res.status(404).json({ success: false, message: "Not a valid token" })
        const userid = decoder?.userId
        const user = await UserModal.findById(userid)
        if (!user) return res.status(404).json({ success: false, message: "User not found" })
        const userObj = {
            FirstName: user?.FirstName,
            LastName: user?.LastName,
            Email: user?.Email,
            _id: user?._id,
            Role: user?.Role
        }
        return res.status(200).json({ success: true, user: userObj })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const userProfilePictureUpload = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }
        console.log(req.file, "83");
        const imageUrl = req.file.path

        if (!token || !imageUrl) return res.status(404).json({ success: false, message: "All field are mandetory" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId

        const checkInvestorKycUser = await kycDocumentModal.findOne({ userId: userId })
        if (checkInvestorKycUser) {
            console.log("94");
            const kycDocCheck = await kycDocumentModal.findByIdAndUpdate(checkInvestorKycUser._id, { userProfilePicture: imageUrl }, { new: true })
            if (kycDocCheck) {
                console.log(kycDocCheck, "93");
                return res.status(201).json({ success: true, userProfile: kycDocCheck, message: "Profile added successfully" })
            }
            return res.status(404).json({ success: false, message: "Incorrect Detail" });
        }

        const addProfile = new kycDocumentModal({
            userProfilePicture:imageUrl,
            userId:userId
        })
        await addProfile.save();
        return res.status(201).json({ success: true, message: "Profile added Successful" })

    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })

    }
}

export const getUserProfileImage = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        } else {
            console.log('Authorization header is missing');
        }

        if (!token) return res.status(404).json({ success: false, message: "All field are mandetory" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success: false, message: "token not found" });
        const userId = decoder?.userId

        const checkInvestorKycUser = await kycDocumentModal.findOne({ userId: userId })
        // console.log(checkInvestorKycUser,"123");
        if(checkInvestorKycUser){
            return res.status(200).json({ success: true, userProfilePictureData: checkInvestorKycUser})
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message })
    }
}