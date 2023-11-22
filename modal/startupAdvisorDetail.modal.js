import mongoose, { Schema } from "mongoose"

export const startupAdvisorSchema = new Schema({
    advisorDetails:[{
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

export default mongoose.model("startupAdvisor",startupAdvisorSchema)