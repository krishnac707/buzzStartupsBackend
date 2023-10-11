import express  from "express"
import { Login, Register, getCurrentUser } from "../controllers/user.controllers.js";

const router = express.Router()

router.post("/register", Register)
router.post("/login", Login)
router.post("/get-current-user",getCurrentUser)


export default router;