import { Router } from 'express'
import emailServices from './email.service'

const emailRouter = Router()

emailRouter
    .route('/')
    .post(emailServices)

export default emailRouter