import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    name: String,
    nickname: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    gender: {
        type: String,
        default: 'Male',
    },
    lastname: String,
    displayname: String,
    password: String,
    pssd:String,
    phone: Number,
    age:Number,
    modular_code:String,
    features_iiee:String,
    distrit:String,
    populated_center:String,
    job:String,
    province:String,
    cellphone:String,
    email: {
        type: String,
        unique: false
    },
    created_by : {
        type : Schema.Types.ObjectId
    },
    iiee:String,
    active: Boolean,
    upgrade: String,
    photo: String,
    courses: [],
    rol: {
        type: Number,
        default: 4
    },
    teachers: [
        {
          type : Schema.Types.ObjectId,
          ref:'User' 
        }
    ],
    //para gestor
    usersInCharge : [
        {
            id_user : {
                type : Schema.Types.ObjectId,
                ref:'User'
            },
            added_by : {
                type : Schema.Types.ObjectId,
                ref:'User'
            },
            name:String,
            lastname:String,
            rol:Number
        }
    ],
    //
    regions:{
        type:[],
        lowercase:true
    },
    region : {
        type : String,
        lowercase : true
    },
    user_time:{
        type : Schema.Types.ObjectId,
        ref:'UserTime'
    },
    session_init: String,
    session_end: String,
    duration: String,
    duration_seconds: Number
  },
  { timestamps: true }
)

userSchema.pre("save", function(this: any, next: any){
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
        return next(err)
        }

        this.password = hash
        next()
    })
})
  
userSchema.methods.checkPassword = function(user, password:string) {
  const passwordHash = user.password
  return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
          return reject(err)
      }

      resolve(same)
      })
  })
}

const timeSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    start_time:{
        type:String,
        default:0
    },
    end_time:{
        type:String,
        default:0
    },
    time:{
        type:Number,
        default:0
    },
    name_module:String,
    component:String,
    region:String
})

export const UserTime = model('user_times', timeSchema)
export const User = model('users', userSchema)