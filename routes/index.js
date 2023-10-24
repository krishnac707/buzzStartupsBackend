import express from "express"
import allRoutes from "./AllRoutes.js"
import StartupRoutes from "./StartupRoutes.js"
import InvestorRoutes from "./InvestorRoutes.js";
import zosRoutes from "./zosRoutes.js"

const router = express.Router()

router.use("/all",allRoutes);
router.use("/startups",StartupRoutes)
router.use("/investors",InvestorRoutes)
router.use("/buzz-startup-ai",zosRoutes)

export default router;