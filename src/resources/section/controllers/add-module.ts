import catchAsync from '../../../utils/catchAsync'
import AWS from 'aws-sdk'

const bucket = process.env.BUCKET_NAME
    const s3 = new AWS.S3({
      accessKeyId: process.env.ID,
      secretAccessKey: process.env.SECRET
    })

let msgErrorController = 'Error en add module controlador'

const addModule = (Module, File) => catchAsync(msgErrorController,async (req, res) => {
    /** Capturamos nickname de usuario registrado*/
    
    const {
      nickname,
      rol
    } = req.user

    /** 
     * Capturamos data que nos envian desde el cliente : req.body
     * */
    const {
      component,
      name_module
    } = req.body

    req.body.nickname = nickname
    req.body.createdBy = {
      nickname:nickname,
      rol:rol
    }

    const existingModule = await Module.findOne({nickname, component, name_module})

    if(existingModule){
      return res.status(200).json({
        message:'El módulo ya está creado',
        module:existingModule
      })
    }
    

    /** subir archivo pdf información */
    let imageURL = ''
    let info = []
    if(req.files){

      const image = req.files.image
      const pdf = req.files.pdf
      
      const params = {
        Bucket: `${bucket}/test/images/${nickname}`,
        Key:`${image.name}`,
        Body:image.data,
        ContentDisposition:"inline",
        Metadata: {
          'Content-Type': 'image/jpeg'
        },
        ACL:'public-read'
      }

      const s3File = await s3.upload(params).promise()
      if(!s3File) res.status(500).json({message:'Error al subir imagen'})
      imageURL = s3File.Location

      if(pdf){
        
        if(!pdf.length) {
          const params = {
            Bucket: `${bucket}/test/images/${nickname}`,
            Key:`${pdf.name}`,
            Body:pdf.data,
            ContentDisposition:"inline",
            ContentType:"application/pdf",
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
              Bucket: `${bucket}/test/images/${nickname}`,
              Key:`${item.name}`,
              Body:item.data,
              ContentDisposition:"inline",
              ContentType:"application/pdf",
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
    
    /** 
     * Agregamos valor a req.body 
     * */
    req.body.imageURL = imageURL
    req.body.info = info

    /** 
     * Creamos documento y agregamos a la colección modules 
     * */
    const createModule = await Module.create(req.body)

    res.status(200).json({
      message : "Módulo agregado",
      module : createModule
    })

})
  
export default addModule



 //   const pdfs = req.files.pdf
    //   console.log("Files", req.files)
    //   if(pdfs){
    //     if(pdfs.length){
    //       pdfs.map(item => {
    //         const pathURL = `./uploaded_files/modules/${nickname}/${item.name}`
    //         item.mv(pathURL)
    //         const url = path.resolve(__dirname, `/assets/modules/${nickname}/${item.name}`)
    //         pdfsURL.push(url)
            
    //       })
    //     }else{
    //       const pathURL = `./uploaded_files/modules/${nickname}/${pdfs.name}`
    //       pdfs.mv(pathURL)
    //       pdfsURL.push(path.resolve(__dirname, `/assets/modules/${nickname}/${pdfs.name}`))
    //     }
    //   }
      

    //   req.body.type = 'pdf'
    //   req.body.data = pdfsURL
    //   const file = await File.create(req.body)

    //   info.push(file._id)

    // const pathURL = `./uploaded_files/modules/${nickname}/${images.name}`
      // images.mv(pathURL)
      // imageURL = path.resolve(__dirname, `/assets/modules/${nickname}/${images.name}`)