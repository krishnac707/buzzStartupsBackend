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
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model("startupExistingInvestor",startupExistingInvestorSchema)