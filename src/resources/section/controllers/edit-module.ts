import catchAsync from '../../../utils/catchAsync'
import path from 'path'
import AWS from 'aws-sdk'
let msgErrorController = 'Error en edit module controlador'

const bucket = process.env.BUCKET_NAME
const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
})

// const uploadedFileUrl = (nickname, file) => {
//   const name = file.name
//   const pathURL = `./uploaded_files/modules/${nickname}/${name}`
//   file.mv(pathURL)
//   const url = path.resolve(__dirname, `/assets/modules/${nickname}/${name}`)
//   return url
// }

const editModule = (Module, File) => catchAsync(msgErrorController,async (req, res) => {

    

    /** Capturamos nickname de usuario registrado*/
    const { nickname } = req.user
    const { id_module } = req.body

    /** subir archivo pdf información */
    
    /** buscar campo info  de modulo por ID */ 
    let { info } = await Module.findById(id_module)

    if(!info) res.status(500).json({message:'Módulo no existe'})

    let imageURL = ''

    if(req.files){
      const { image, pdf } = req.files

      //subir imagen
      if(image){
        const params = {
          Bucket: `${bucket}/test/images/${nickname}`,
          Key:`${image.name}`,
          Body:image.data,
          Metadata: {
            'Content-Type': 'image/jpeg'
          },
          ACL:'public-read'
        }
  
        const s3File = await s3.upload(params).promise()
  
        if(!s3File) res.status(500).json({message:'Error al subir imagen'})
        imageURL = s3File.Location
      }

      if(pdf){

        if(!pdf.length) {
          const params = {
            Bucket: `${bucket}/test/pdfs/${nickname}`,
            Key:`${pdf.name}`,
            Body:pdf.data,
            Metadata: {
              'Content-Type': 'application/pdf'
            },
            ACL:'public-read'
          }
    
          const s3File = await s3.upload(params).promise()
          if(!s3File) res.status(500).json({message:'Error al subir imagen'})
          let pdfURL = s3File.Location

          const file = new File({
            type :'pdf',
            title :pdf.name,
            pdfURL :pdfURL
          })

          file.save()
          info.push(file._id) 
        }else{
          await Promise.all(pdf.map(async (item) => {
            const params = {
              Bucket: `${bucket}/test/pdfs/${nickname}`,
              Key:`${item.name}`,
              Body:item.data,
              Metadata: {
                'Content-Type': 'application/pdf'
              },
              ACL:'public-read'
            }
      
            const s3File = await s3.upload(params).promise()
            if(!s3File) res.status(500).json({message:'Error al subir imagen'})
            let pdfURL = s3File.Location

            const file = new File({
              type :'pdf',
              title :item.name,
              pdfURL :pdfURL
            })

            file.save()
            info.push(file._id) 
          }))
        }
      }
    }
    
    const module = await Module.findById(id_module)
    
    req.body.info = info || module.info
    req.body.imageURL = imageURL || module.imageURL

    const moduleOptions = {
      _id:id_module
    }

    await Module.updateOne(moduleOptions, req.body)
    const moduleUpdated = await Module
                                  .findById(id_module)
                                  .populate({
                                    path:'info', 
                                    model:'files'
                                  })
                                  .select('-infoID')

    res.status(200).json({
      message : "Módulo actualizado",
      module : moduleUpdated
    })

})
  
export default editModule