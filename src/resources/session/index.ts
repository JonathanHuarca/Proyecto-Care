import { Router } from 'express'
import sessionService from './session.service'

const session = Router()

session
    .route('/')
    .post(sessionService)

export default session
