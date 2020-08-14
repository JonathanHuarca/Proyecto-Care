/** CLuster  */
import os from 'os'
import config from './index'
const cpus = os.cpus()
const numberCPUs = cpus.length

const options = [
  "Algo nuevo?",
  "Quizás deberias ver TV",
  "Ve a dormir!!",
  "Sigue trajando en backend",
  "Quizás deberias ir a  dormir"
]

const payload =  ( req, res, next ) => {
  const randomIndex = Math.floor(Math.random()*options.length)
    const payload = {
      port: config.port,
      processID: process.pid,
      advice: options[randomIndex],
      numberOfProcesses: numberCPUs ,
      message: `worker: ${process.pid}`
    }

    if(req.url === '/kill'){
      res.redirect('/')
      process.exit()
    }
    if(process.env.NODE_ENV!== 'testing'){
      console.log(`serving from ${process.pid}`)
    }
    
  req.payload = payload
  next()
}

export { payload }