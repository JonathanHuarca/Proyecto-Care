import { Router } from 'express'
import pdfService from './pdf.service'

const pdf = Router()

pdf
    .route('/')
    .post(pdfService)

export default pdf