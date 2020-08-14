import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
    module: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    askedBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    answer: String,
    files : [],
    region : String,
    answeredBy: {
        type: Schema.Types.ObjectId,
    },
    rol: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export const Question = model('questions', questionSchema)