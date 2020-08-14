import catchAsync from '../../../utils/catchAsync'
import moment from 'moment-timezone'

let msgErrorController = 'Error en update section controlador'

const updateSection = (UserSection, UserFile, LastSection) => catchAsync(msgErrorController,async (req, res) => {
    const { nickname, _id , rol } = req.user
    const { id_section, id_activity, download } = req.body
    // const download = req.body.download || 0

    const section = await UserSection.findById(id_section)
    const { component, name_module } = section
    const file = await UserFile.findById(id_activity)

    if(download && file){
      file.number_of_downloads = 1
      file.save()
    }
    
    

    section.completed = 1
    
    await Promise.all[section.save()]

    // update last section
    req.body.nickname = nickname
    req.body.user = _id
    req.body.rol = rol
    req.body.name_module = name_module
    req.body.component = component
    
    const lastSectionByUser = await LastSection.findOne({nickname,component, name_module})
    
    if(!lastSectionByUser){
      await LastSection.create(req.body)
    }

    if(lastSectionByUser){
      lastSectionByUser.id_section = id_section
      lastSectionByUser.save()
    }
  
    res.status(200).json({
      message : "Sección completada",
      section : section,
      lastSection: lastSectionByUser
    })
})
  
export default updateSection