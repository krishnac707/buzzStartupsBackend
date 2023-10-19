import express from "express"
import allRoutes from "./AllRoutes.js"
import StartupRoutes from "./StartupRoutes.js"
import InvestorRoutes from "./InvestorRoutes.js";

const router = express.Router()

router.use("/all",allRoutes);
router.use("/startups",StartupRoutes)
router.use("/investors",InvestorRoutes)

export default router;