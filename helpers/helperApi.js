import axios from "axios";

export const helperZosApi = async (prompt) => {
    try {
        // const apiKey = process.env.AUTHORIZATION_KEY;
        const API_VALUE = process.env.AUTHORIZATION_VALUE;
        const purchaseApiLink = "https://api.zosagi.com/api/service/llm/v3"
        const headers = {
            'Content-Type': 'application/json',
            'authorization': API_VALUE,
        };
        const data = {"q": prompt};
        const response = await axios.post(purchaseApiLink, data , { headers: headers })
        return response;
    } catch (error) {
        console.log(error);
    }
}