import { Router } from 'express'
import downloadServices from './download.service'

const download = Router()

download
  .route('/:id_download')
  .get(downloadServices)

export default download