import mongoose, { Schema } from "mongoose";

const StartupMultiStepFormSchema = new Schema({
    StartupName: {
        type:String,
        required : true
    },
    StartupEmail:{
        type:String,
        required :true
    },
    StartupDate:{
        type:Date,
        required:true
    },
    StartupWebsiteUrl:{
        type:String,
    },
    StartupHeadQuarter:{
        type:String,
    },
    StartupState:{
        type:String,
        required:true
    },
    StartupCity:{
        type:String,
        required:true
    },
    StartupPincode:{
        type:Number,
        required:true,
    },
    StartupStage:{
        type:String,
        required:true,
    },
    StartupBusinessType:{
        type:String,
        required:true,
    },
    StartupMultipleSector:{
        type:String,
        required:true,
    },
    StartupRound:{
        type:String,
        required:true,
    },
    StartupPreviousInvestment:{
        type:String,
        required:true,
    },
    StartupKnowAboutUs :{
        type:String,
        required:true,
    },
    StartupTermsAndCondition:{
        type:Boolean,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

export default mongoose.model("StartupMultiStepForm",StartupMultiStepFormSchema)