import { Router } from 'express'
import teacherServices from './teacher.services'

const teacher = Router()

teacher
    .route('/')
    .post(teacherServices)

export default teacher