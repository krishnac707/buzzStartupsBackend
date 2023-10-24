import mongoose from "mongoose"

const kycDocSchema = new Schema({
    aadharFront : {
        type:String,
    },
    aadharBack : {
        type: String,
    },
    panCard :{
        type:String
    },
    passportFront:{
        type:String
    },
    passportBack:{
        type:String
    },
    userId:{
        type:mongoose.Types.ObjectId,
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

export default mongoose.model("kycDocument",kycDocSchema)