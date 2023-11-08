import mongoose, { Schema } from "mongoose"

const startupFounderSchema = new Schema({
    founderArray: [
        {
            name: {
                type: String,
            },
            dateOfBirth: {
                type: Date
            },
            emailId: {
                type: String
            },
            linkedinUrl: {
                type: String
            },
            currentCity: {
                type: String
            },
            experience: {
                type: String
            },
            education: {
                type: String
            },
            phoneNo: {
                type: String
            }
        }
    ],
    // startupTeamSize:{
    //     type:String
    // },
    // startupAdvisorName:{
    //     type:String
    // },
    // startupAdvisorLinkedinUrl:{
    //     type:String
    // },
    // startupExistingInvestorName:{
    //     type:String
    // },
    // startupExistingInvestorLinkedin:{
    //     type:String
    // },   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model("startupFounder", startupFounderSchema)