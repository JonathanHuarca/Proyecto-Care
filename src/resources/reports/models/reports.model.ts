import { Schema, model } from "mongoose";

const reportSchema = new Schema({
    idKPI: {
        type: Schema.Types.ObjectId,
        //required: true
    },
    content: {
        type: String,
        //required: true
    },
    preview : String,
    state : {
        type : String,
        default : "recibido"
    },
    region: String,
    name_report : String,
    pathURL : String,
    download_id : String,
    name_coord : {
        type :String,
        default : ''
    },
    lastname_coord : {
        type :String,
        default : ''
    },
    created_by: Schema.Types.ObjectId,
    //AWS
    url_aws  :String
}, { timestamps: true })

const Report = model('report', reportSchema)
export default Report