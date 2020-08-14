import { Router } from 'express'
import activityServices from './section.services'

const activity = Router()

activity
    .route('/')
    .post(activityServices)

export default activity