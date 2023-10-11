import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        enum: ['Admin', 'Startup', 'Investor', 'SuperAdmin', 'Partner'],
        default: 'Startup'
    },
})

export default mongoose.model("User",userSchema)
