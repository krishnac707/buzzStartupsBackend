import mongoose, { Schema } from "mongoose";

const startupFundingSchema = new Schema({
    currencyType : {
        type:String,
        required:true
    },
    fundingAsk:{
        type:Number,
        required: true
    },
    valuation:{
        type:Number,
        required:true
    },
    minimumTicketSize:{
        type: Number,
        required:true
    },
    capTableEntryFounder:{
        type:Number,
        required:true
    },
    capTableEntryESOP:{
        type:Number,
        required:true
    },
    capTableEntryInvestor:{
        type:Number,
        required:true
    },
    commitmentSoFar:{
        type:Number,
        required:true
    },
    
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }  
})
export default mongoose.model("startupFunding",startupFundingSchema)
