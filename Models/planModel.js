import mongoose from "mongoose";

const Schema = mongoose.Schema

const planModel = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    user_id: {
        type: String
    }
})

const Plan = mongoose.model('plan', planModel)

export default Plan