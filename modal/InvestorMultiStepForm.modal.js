import mongoose, { Schema } from "mongoose";

const InvestorMultiStepFormSchema = new Schema({
    InvestorName: {
        type: String,
        required: true
    },
    InvestorEmail:{
        type:String,
        required:true
    },
    InvestorNumber:{
        type:String,
        required:true
    },
    InvestorLinkdinUrl:{
        type:String
    },
    InvestorCountry:{
        type:String,
        required:true
    },
    InvestorState:{
        type:String,
    },
    InvestorCity:{
        type:String,
        required:true
    },
    InvestorPincode:{
        type:Number,
        required:true
    },
    InvestorBusinessType:{
        type:String,
        required:true
    },
    InvestorOrganizationName:{
        type:String,
        required:true
    },
    InvestorDesignation:{
        type:String,
        required:true
    },
    InvestorWebsiteUrl:{
        type:String,
        required:true,
    },
    InvestorInvestedStartup:{
        type:String,
        required:true
    },
    InvestorInterestedSector:{
        type:String,
        required:true
    },
    InvestorInvestingAmount:{
        type:String,
        required:true
    },
    InvestorKownAboutUs:{
        type:String,
        required:true
    },
    InvestorTermAndCondition:{
        type:Boolean,
        required:true
    },
    InvestorAboutMe:{
        type:String,
    },
    InvestorFacebookUrl:{
        type:String,        
    },
    InvestorTwitterUrl:{
        type:String,
    },
    InvestorAddActvities:{
        type:String,
    },
    InvestorEducationBackground:{
        type:String,
    },
    InvestorWorkExperience:{
        type:String,
    },
    InvestorAssociation:{
        type:String,
    },
    InvestorProfileImage:{
        type:String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    startupCompany:{
        type:[String]
    }

})

export default mongoose.model("InvestorCompany",InvestorMultiStepFormSchema)