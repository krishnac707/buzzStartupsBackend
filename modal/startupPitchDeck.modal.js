import mongoose, { Schema } from "mongoose";

const pitchDeckSchema = new Schema({
    pitchDeckDetails: [{
        pitchName: {
            type: String
        },
        pitchDescription: {
            type: String
        },
        fileDoc: {
            type: String
        }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model("startupPitchDeck", pitchDeckSchema)