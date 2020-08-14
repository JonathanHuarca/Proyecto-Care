import { Router } from 'express'
import courseServices from './courses.services'

const course = Router()

course
  .route('/')
  .post(courseServices)

export default course