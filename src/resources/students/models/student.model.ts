import { Schema, model } from 'mongoose'

const studentSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: String,
        dni: String,
        code: String,
        covid: String,
        attorney: String,
        origin: String,
        teacher: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }
)

export const Student = model('students', studentSchema)