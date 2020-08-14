import {Schema,model} from 'mongoose'

const forumSchema = new Schema(
    {
        forum_name : String,
        id_asesor : Schema.Types.ObjectId,
        id_gestor : Schema.Types.ObjectId,
        id_psicologo : Schema.Types.ObjectId,
        id_section : Schema.Types.ObjectId,
        id_activity : Schema.Types.ObjectId,
        members : [],
        questions : [
            {
                question : String,
                askedBy_id : Schema.Types.ObjectId,
                askedBy_name : String,
                askedBy_lastname : String,
                dateOfCreating : Date,
                answers : [
                    {
                        answer : String,
                        answeredBy_id : Schema.Types.ObjectId,
                        answeredBy_name : String,
                        answeredBy_lastname : String,
                        dateOfCreating : Date,
                    }
                ]
            }
        ]
    }
)

export const forumModel = model('forum',forumSchema)