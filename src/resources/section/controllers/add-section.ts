import catchAsync from '../../../utils/catchAsync'
import path from 'path'
import documents from '../../../temp/data'
import modulo1 from '../../../temp/modulo1'
import modulo2 from '../../../temp/modulo2'
import modulo3 from '../../../temp/modulo3'

const types = ["forum", "questions", "ideas", "activities", "poll"]

// const uploadedFileUrl = (nickname, file) => {
//   const name = file.name
//   const pathURL = `./uploaded_files/modules/sections/${nickname}/${name}`
//   file.mv(pathURL)
//   const url = path.resolve(__dirname, `/assets/modules/sections/${nickname}/${name}`)
//   return url
// }

let msgErrorController = 'Error en add activity controlador'

const addSection = (Section, Module) => catchAsync(msgErrorController,async (req, res) => {

  const {
    nickname,
  } = req.user

  req.body.createdBy = nickname
  req.body.nickname = nickname


  const {
    id_module,
  } = req.body
  
  const {
    name_module,
    component
  } = await Module.findById(id_module)

  req.body.name_module = name_module
  req.body.component = component

  const section = await Section.create(req.body)
  
  res.status(200).json({
    message : "Sección agregado correctamente",
    section : section
  })
})

export default addSection

// const sections = await Section.insertMany(documents)
  // const sections1 = await Section.insertMany(modulo1)
  // const sections2 = await Section.insertMany(modulo2)
  // const sections3 = await Section.insertMany(modulo3)

// let files = []

  // if(req.files){

  //   const { pdf, activity } = req.files
    
  //   if(pdf){
  //     let data = []
  //     pdf.map(item => {
  //       let pdfURL = uploadedFileUrl(nickname, item)
  //       data.push(pdfURL)
  //     })
  //     const file = new File({
  //       type:'pdf',
  //       title:'title pdf',
  //       description:'descripción de pdf',
  //       data : data
  //     })
  //     file.save()
  //     files.push(file._id) 
  //   }

  //   if(activity){
  //     let data = []
  //     activity.map(item => {
  //       let activityURL = uploadedFileUrl(nickname, item)
  //       data.push(activityURL)
  //     })
  //     const file = new File({
  //       type:'pdf',
  //       title:'title pdf',
  //       description:'descripción de actividad',
  //       data : data
  //     })
  //     file.save()
  //     files.push(file._id) 
  //   }
  // }
  // req.body.files = files