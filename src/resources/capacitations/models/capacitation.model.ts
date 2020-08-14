import { Schema, model } from 'mongoose'

const capacitationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    directed_to: [],
    created_by: Schema.Types.ObjectId,
}, { timestamps: true });

const Capacitation = model('capacitation', capacitationSchema)

export { Capacitation }