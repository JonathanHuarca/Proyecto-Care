import { Router } from 'express'
import adServices from './ad.service'

const adRouter = Router()

adRouter
    .route('/')
    .post(adServices)

export default adRouter