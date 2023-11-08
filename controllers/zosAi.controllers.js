import { helperZosApi } from "../helpers/helperApi.js";
import jwt from "jsonwebtoken";
import MarketSearchModal from "../modal/MarketSearch.modal.js";

export const zosMarketAnalysisAi = async (req, res) => {
    try {
        const { prompt, token } = req.body;
        if (!prompt || !token) return res.status(400).json({ success: false, message: "Prompt is missing" })

        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoder) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }
        const userId = decoder.userId
        const apiData = await helperZosApi(prompt)
        if (apiData) {
            const groupId = apiData.data.group_id;
                const userGroupId = new MarketSearchModal({
                    group_id: groupId,
                    searchedPrompt: prompt,
                    shortDescriptionFromZos: apiData.data.data
                })
                await userGroupId.save();
            return res.status(200).json({ success: true, promptData: apiData.data })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}