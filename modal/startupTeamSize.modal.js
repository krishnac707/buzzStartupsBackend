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
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

export default mongoose.model("startupTeamSize",startupTeamSizeSchema)