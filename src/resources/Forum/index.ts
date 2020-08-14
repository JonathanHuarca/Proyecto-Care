import { Router } from 'express'
import forumServices from './forum.service'

const forum = Router()

forum
    .route('/')
    .post(forumServices)

export default forum