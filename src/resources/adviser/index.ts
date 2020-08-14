import { Router } from 'express'
import adviserService from './adviser.service'

const adviser = Router()

adviser
    .route('/')
    .post(adviserService)

export default adviser