import catchAsync from '../../../utils/catchAsync'
import moment from 'moment-timezone'
import AWS from 'aws-sdk'

let msgErrorController = 'Error en uplodad file section controlador'

/**
 * credenciales para S3
 */
const bucket = process.env.BUCKET_NAME
const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
})

const format = 'DD/MM/YYYY - HH:mm:ss'
const formatTime = "HH:mm:ss"


const upload_file = (UserSection, UserFile, File) => catchAsync(msgErrorController,async (req, res) => {
    
    const { nickname } = req.user
    const { 
      id_section, 
      id_activity 
    } = req.body

    
    const section = await UserSection.findById(id_section)
    const { name_section } = section
    const { type, title } = await File.findById(id_activity)
    
    if(!section){
      return res.status(500).json({message : `Sección para el usuario ${nickname} no existe` })
    }

    const userActivity = await UserFile.findOne({nickname, type, title, name_section})
    console.log(userActivity)
    if(!userActivity){
      return res.status(500).json({message:`actividad para ${nickname} no existe`})
    }

    /**  capturando el tiempo en que se sube la actividad por el usuario */

    const end_time = moment().tz("America/Lima").format(format) 
    console.log(end_time)
    userActivity.end_time = end_time

    const {
      start_time,
      time,
      time_in_seconds
    } = userActivity


    let formatDate = "DD/MM/YYYY HH:mm:ss"

    if (time === 'Invalid date' || time_in_seconds ==='Invalid date') {
      userActivity.time = ''
      userActivity.time_in_seconds = 0
    }else { 
      let duration_time = moment.utc(moment(end_time, formatDate).diff(moment(start_time, formatDate))).format(formatTime)

      userActivity.time = duration_time
      userActivity.time_in_seconds = moment.duration(duration_time).asSeconds()
    }

    
    /** ========================================================= */
    if(!req.files){
      return res.status(500).json({message : "Archivo no recibido"})
    }

    const { activity } = req.files

    let sent = section.sent

    if(activity){
        // verificamos si pdf es un array
        if(!activity.length) {
          const params = {
            Bucket: `${bucket}/test/pdfs/${nickname}`,
            Key:`${activity.name}`,
            Body:activity.data,
            ACL:'public-read'
            
          }
          
          const s3File = await s3.upload(params).promise()
          if(!s3File) res.status(500).json({message:'Error al subir imagen'})
          let activityURL = s3File.Location

          userActivity.data = [activityURL]
          console.log('archivo subido')
          
        }
      }

    await userActivity.save()

    section.sent = sent

    await section.save()

    res.status(200).json({
        message : "Archivo(s) de la actividad subidos correctamente ",
        activity : section
    })
})
  
export default upload_file