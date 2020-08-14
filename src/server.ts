import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import path from 'path'
import consola from 'signale'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import cluster from 'cluster'
import os from 'os'
import home from './resources/home/home.router'
import fileUpload from 'express-fileupload'
import rateLimit from 'express-rate-limit'
// import files
import connectDB from './config/db'
import { payload } from './config/cluster'
import logger from './middleware/logger'
import errorHandler from './middleware/error'
import { testRol } from './services/auth/user/controllers'
import { protect, signup, signin } from './services/auth/user'
import routing from './routing'
import downloadService from './resources/download/'


dotenv.config()

Object.defineProperty(exports, "__esModule", { value: true });
const app = express()
const httpServer = http.createServer(app)
const PORT = process.env.PORT
let numberCPUs;
numberCPUs = 1

if (process.env.NODE_ENV === 'production') {
  numberCPUs = os.cpus().length
}

app.disable('x-powered-by')
app.use(cors())

// para que reciva archivos
app.use(fileUpload({
  createParentPath: true
}));

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(payload)
app.use(logger)

// Pug Config
app.set('view engine', 'pug')
app.set('views', path.resolve(__dirname, '../client/views'))

/** Routes */
app.post('/signup', signup)
app.post('/signin', signin)
app.use('/download',downloadService)

if (process.env.NODE_ENV === 'development') {
  app.use('/api', testRol, routing)
} else {
  app.use('/api',protect, routing)
}
app.use('/pdf', express.static(path.resolve(__dirname,'../uploaded_files')));

app.use('/assets', express.static(path.resolve(__dirname,'../uploaded_files')));

app.use('/', home)

app.use('*', (req, res, next) => {
  res.json({
    message: 'Ruta no disponible',
    path: req.originalUrl
  })
})




/** Error */
app.use(errorHandler)

let server: any;

const start = async () => {
  try {
    if (cluster.isMaster) {
      for (let i = 0; i < numberCPUs; i++) {
        cluster.fork(); // clonando cluster
      }
      cluster.on('exit', worker => {
        cluster.fork()
      })
    } else {
      await connectDB();
      await httpServer.listen(PORT, () => {
        consola.success(`API on http://localhost:${PORT} process pip: ${process.pid}`)
      })
    }
  } catch (e) {
    consola.success('Error server')
  }
}

process.on('unhandledRejection', (err, promise) => {
  consola.error(`Error ${err}`)
  server.close(() => {
    /** close server & exit process */
    process.exit(1)
  })
})

export { app, start };
