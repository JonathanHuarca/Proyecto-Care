import { Router } from 'express'
import kpiServices from './kpi.service'

const kpi = Router()

kpi
    .route('/')
    .post(kpiServices)

export default kpi