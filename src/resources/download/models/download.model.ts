import { Schema, model } from 'mongoose';

const downloadSchema = new Schema({
    nickname:String,
    file_name: {
        type: String,
    },
    pathURL: {
        type: String
    },
    //aws s3
    key:String,
    aws_name_file:String,
    isImage : {
        type: Boolean,
        default : false
    },
    url_image : String
}, { timestamps: true })

export const downloadModel = model('download', downloadSchema)