import mongoose, { Schema } from "mongoose"

const startupFinalProjectionSchema = new Schema({
    finalProjectionDetails: [
        {
            docName: {
                type: String
            },
            docDescription: {
                type: String
            },
            fileUrl: {
                type: String
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model("startupFinalProjection", startupFinalProjectionSchema)