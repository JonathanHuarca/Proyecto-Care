import { Router } from 'express'
import questionService from './question.service'

const question = Router()

question
    .route('/')
    .post(questionService)

export default question