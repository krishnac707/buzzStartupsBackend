import express from "express"
import allRoutes from "./AllRoutes.js"

const router = express.Router()

router.use("/all",allRoutes);

export default router;