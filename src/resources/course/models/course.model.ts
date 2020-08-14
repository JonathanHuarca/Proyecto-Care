import { Schema, model } from 'mongoose'

const courseSchema = new Schema({
  createdBy: String,
  id_user:Schema.Types.ObjectId,
  course_name:String,
  description:String,
  date_start:Date,
  date_end:Date,
  image:String,
  competences:[],
  state:String,
  level:String,
  grade:String,
  lessons:[],
  school: {
    type:String
  },
  section: String,
  students: []
})

const Course = model('courses_v2', courseSchema)

export { Course }