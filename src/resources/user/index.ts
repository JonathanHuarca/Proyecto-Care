import { Router } from 'express'
import adminServices from './admin.services'

const teacher = Router()

teacher
    .route('/')
    .post(adminServices)

export default teacher