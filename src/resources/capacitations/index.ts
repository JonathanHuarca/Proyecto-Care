import { Router } from 'express'
import capacitationService from './capacitation.service'

const capacitation = Router()

capacitation
    .route('/')
    .post(capacitationService)

export default capacitation