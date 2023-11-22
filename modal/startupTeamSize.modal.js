import mongoose, { Schema } from "mongoose"

const startupTeamSizeSchema = new Schema({
    teamSizeDetails:[{
        teamName:{
            type:String
        },
        teamSize:{
            type:Number
        }
    }],
    startupCompanyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "startupCompanies"
    }

})

export default mongoose.model("startupTeamSize",startupTeamSizeSchema)