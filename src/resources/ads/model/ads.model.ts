import {Schema , model} from 'mongoose'

const schemaAd = new Schema(
    {
      content : String,
      file : [],
      date_created : String  
    },
    {
        timestamps : true
    }
)

export const adModel = model('ad',schemaAd)