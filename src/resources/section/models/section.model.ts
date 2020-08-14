import { Schema, model } from 'mongoose'
import { User }from '../../../services/auth/user/models/index'
const sectionSchema = new Schema({
  nickname:String,
  region:{
    type:String,
  },
  user : {
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  createdBy:String,
  activity:{
    title:String,
    filetype:String,
    name_file : String,
    pathURL : String
  },
  name_module:String,
  fullname_module:String,
  block:{
    type:Number,
    default:'1'
  },
  name_block:{
    type:String,
    default:'bloque 1'
  },
  joined:{
    type:Boolean,
    default:false
  },
  section:{
    type:Number,
    default:1
  },
  name_section:String,
  file:[],
  comments:{
    type:[],
    default:['Sin comentarios']
  },
  completed:{
    type:Number,
    default:0
  },
  added:{
    type:Boolean,
    default:false
  },
  component:{
    type:String,
    lowercase:true
  },
  questionResolve:[],
  pollResolve:[],
  state:Boolean,
  number_of_downloads:{
    type:Number,
    default:0
  },
  //FORUM CHANGES
  type_activity : String,
  userInForum : {
    type : Boolean,
    default : false
  },
  files : [{
    type:Schema.Types.ObjectId,
    ref:'File'
  }],
  sent : [{
    type:Schema.Types.ObjectId,
    ref:'File'
  }]
})

sectionSchema.pre('save', function(this:any, next:any){
  this.fullname_module = `${this.name_module} - ${this.component}`
  next()
})

const moduleSchema = new Schema({
  nickname:String,
  user : {
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  createdBy:{
    nickname:String,
    rol:Number
  },
  region:{
    type:String,
    default:''
  },
  regions:[],
  component:String,
  publish:{
    type:Boolean,
    default:false
  },
  name_module:{
    type:String,
    lowercase:true
  },
  imageURL:{
    type:String,
    default:'http://api-care....'
  },
  completed:{
    type:Number,
    default:0
  },
  title:String,
  info:[{
    type:Schema.Types.ObjectId,
    ref:'File'
  }],
  porcent: {
    type:Number,
    default: 0.00
  }
})

moduleSchema.pre('save', function(this:any, next:any){
  this.fullname_module = `${this.name_module} - ${this.component}`
  next()
})

const lastSection = new Schema({
  nickname:String,
  user : {
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  component:String,
  name_module:String,
  fullname_module:String,
  rol:Number,
  id_section:{
    type : Schema.Types.ObjectId,
    ref:'UserSection'
  }
})

const fileSchema = new Schema({
  nickname:String,
  user : {
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  type:String,
  region:{
    type:String,
    default:''
  },
  name_section:String,
  component:String,
  name_module:String,
  valotary:{
    type:[],
    default:[]
  },
  description:String,
  title:{
    type:String,
    lowercase:true,
    default:'title'
  },
  completed:{
    type:Number,
    default:0
  },
  pdfURL:String,
  data:[],
  start_time: {
    type:String,
    default:0
  },
  end_time: {
    type:String,
    default:0
  },
  time: {
    type:String,
    default:0
  },
  time_in_seconds: {
    type:Number,
    default:0
  },
  number_of_downloads:{
    type:Number,
    default:0
  },
})


sectionSchema.index({name_section:-1})
moduleSchema.index({nickname:-1})
fileSchema.index({type:-1})

const Section = model('sections', sectionSchema)
const Module = model('modules', moduleSchema)
const UserModule = model('user_modules', moduleSchema)
const File = model('files', fileSchema)
const UserFile = model('user_files', fileSchema)
const UserSection = model('user_sections', sectionSchema)
const LastSection = model('last_sections', lastSection)

export { Section, Module, UserModule, UserSection,LastSection, File, UserFile}