import { Router } from 'express'
import studentService from './student.services'

const student = Router()

student
  .route('/')
  .post(studentService)

export default student
