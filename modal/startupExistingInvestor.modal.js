import mongoose, { Schema } from "mongoose"

export const startupExistingInvestorSchema = new Schema({
    existingInvestorDetails:[{
        name:{
            type:String
        },
        linkedinUrl:{
            type:String
        }
    }],
    startupCompanyId:{
        type:mongoose.Types.ObjectId,
        ref:'startupCompanies'
    }
})

export default mongoose.model("startupExistingInvestor",startupExistingInvestorSchema)