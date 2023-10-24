import mongoose, { Schema } from "mongoose";

const MarketSearchSchema = new Schema({
    group_id:{
        type: String,
    },
    shortDescriptionFromZos:{
        type:String
    },
    searchedPrompt:{
        type:String
    },
    branding:{
        type:String
    },
    industryInsight:{
        type:String
    },
    marketResearch:{
        type:String
    },
    swotAnalysis:{
        type:String    
    },
    pestelAnalysis:{
        type:String
    },
    productRequirement:{
        type:String
    },
    pathToMVP:{
        type:String
    },
    businessOnePager:{
        type:String
    },
    marketPlan:{
        type:String
    },
    hiringPlan:{
        type:String
    },
    goToMarketStrategy:{
        type:String
    },
    date: { 
        type: Date, default: Date.now
     },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    investorCompanyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'InvestorCompany'
    },
    startupCompanyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'StartupCompany'
    }
})
export default mongoose.model("zosChat",MarketSearchSchema)
