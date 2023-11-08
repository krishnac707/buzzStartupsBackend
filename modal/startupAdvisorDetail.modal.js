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
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model("startupAdvisor",startupAdvisorSchema)