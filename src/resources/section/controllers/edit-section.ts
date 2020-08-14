import catchAsync from '../../../utils/catchAsync'
import path from 'path'
import AWS from 'aws-sdk'

let msgErrorController = 'Error en add activity controlador'


/**
 * credenciales para S3
 */
const bucket = process.env.BUCKET_NAME
const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
})

const editSection = (Section, File) => catchAsync(msgErrorController,async (req, res) => {
  
  const {
    nickname
  } = req.user

  req.body.createdBy = nickname
  req.body.nickname = nickname

  const {
    id_section,
    type,
    title,
    section,
    description
  } = req.body
  
  const docSection = await Section.findById(id_section)
  
  let files = docSection.files
  
  switch(type){
    case 'idea':
      const idea = await File.create(req.body)
      files.push(idea._id)
      break;
    case 'question':
      const question = await File.create(req.body)
      files.push(question._id)
      break;
    case 'questionary':
      const questionary = await File.create(req.body)
      files.push(questionary._id)
      break;
    case 'poll':
      const poll = await File.create(req.body)
      files.push(poll._id)
      break;
    case 'forum':
      const forum = await File.create(req.body)
      files.push(forum._id)
      break;
    default:
      break;
  }

  if(req.files){

    const { data } = req.files
    
    if(data){
      if(!data.length) {
        const params = {
          Bucket: `${bucket}/test/pdfs/${nickname}`,
          Key:`${data.name}`,
          Body:data.data,
          ContentDisposition:"inline",
          ContentType:"application/pdf",
          ACL:'public-read'
        }
        
        const s3File = await s3.upload(params).promise()

        if(!s3File) res.status(500).json({message:'Error al subir imagen'})

        let dataURL = s3File.Location
        
        const file = new File({
          type :type,
          title :title || data.name,
          description:description || '',
          data :dataURL
        })
        file.save()
        files.push(file._id) 

      }else{
        let dataURL = []
        await Promise.all(data.map(async (item) => {
          const params = {
            Bucket: `${bucket}/test/pdfs/${nickname}`,
            Key:`${item.name}`,
            Body:item.data,
            ContentDisposition:"inline",
            ContentType:"application/pdf",
            ACL:'public-read'
          }
          
          const s3File = await s3.upload(params).promise()
          if(!s3File) res.status(500).json({message:'Error al subir imagen'})
          let URL = s3File.Location
          dataURL.push(URL)
        }))
        const file = new File({
          type :type || '',
          title :title || '',
          description:description || '',
          data :dataURL
        })
        await file.save()
        files.push(file._id) 
      }
    }  
    // 
  }
  docSection.section = section || docSection.section
  docSection.files = files
  docSection.save()

  res.status(200).json({
    message : "Sección actualizado correctamente",
    section : docSection
  })
})

export default editSection

// if(data){
  //   let filesURL = []

  //   if(!data.length) {
  //     let dataURL = uploadedFileUrl(nickname, data)
  //     const file = new File({
  //       type: req.body.type,
  //       title:req.body.title,
  //       description:req.body.description,
  //       data : dataURL
  //     })
  //     file.save()
  //     files.push(file._id) 
  //   }else{
  //     data.map(item => {
  //       let dataURL = uploadedFileUrl(nickname, item)
  //       filesURL.push(dataURL)
  //     })
  //     const file = new File({
  //       type:req.body.type,
  //       title:req.body.title,
  //       description:req.body.description,
  //       data : filesURL
  //     })
  //     file.save()
  //     files.push(file._id) 
  //   }        
  // }