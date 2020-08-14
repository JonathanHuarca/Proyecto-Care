import { Router } from 'express'
import reportService from "./reports.service"

const report = Router()

report
   .route('/')
   .post(reportService)

export default report