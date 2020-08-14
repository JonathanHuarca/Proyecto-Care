import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const moduloSchema = new Schema(
  {
    tittle_module: String,
    blocks: [
      {
        index: {
          type: Number,
          required: true
        },
        tittle_block: {
          type: String,
          required: true
        },
        video: {
          type: String
        },
        pdf: {
          type: String
        }
      }
    ],
    created_by: {
      type: Schema.Types.ObjectId
    },

  },
  { timestamps: true }
)



export const modulo = model('modulo', moduloSchema)