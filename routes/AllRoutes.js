import express from "express"
import { Login, Register, getCurrentUser, getUserProfileImage, userProfilePictureUpload } from "../controllers/user.controllers.js";
import multer from 'multer';
import path from 'path';
// import { dirname } from 'path';

const app = express();
// app.use('./uploads',express.static('uploads'))
// app.use(express.static(path.join(__dirname, 'uploads')));

const router = express.Router()

const storageProfilePicture = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const uploadProfilePicture = multer({ storage: storageProfilePicture });

router.put('/update-profile-picture-investor-data', uploadProfilePicture.single('profilePicture'),userProfilePictureUpload);
router.post("/register", Register)
router.post("/login", Login)
router.post("/get-current-user", getCurrentUser)
router.get("/get-profile-image",getUserProfileImage)


export default router;