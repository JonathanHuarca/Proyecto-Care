import { Router } from 'express'
import gestorServices from './gestor.services'

const gestor = Router()

gestor
    .route('/')
    .post(gestorServices)

export default gestor