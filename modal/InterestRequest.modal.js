import mongoose, { Schema } from "mongoose";

const interestRequest = new Schema({
    investorCompanyId: {
        type: String
    },
    startupCompanyId: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

},
{
    timestamps: true,
})

export default mongoose.model("interestRequest", interestRequest)