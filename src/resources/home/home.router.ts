import express, { Router } from 'express'
import * as controller  from './controllers'

const home = Router()

home
  .get('/', controller.home)
  .get('/doc', controller.documentation)
  
export default home
