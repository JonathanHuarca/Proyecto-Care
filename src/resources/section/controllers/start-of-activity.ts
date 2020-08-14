import catchAsync from '../../../utils/catchAsync'
import moment from 'moment-timezone'


let msgErrorController = 'Error en download file section controlador'

const format = 'DD/MM/YYYY - HH:mm:ss'

const startOfActivity = (UserSection, File, UserFile) => catchAsync(msgErrorController,async (req, res) => {
    
    const { 
      _id, 
      nickname, 
      region 
    } = req.user

    const { 
      id_section, 
      id_activity 
    } = req.body

    let section = await UserSection.findById(id_section)
    const { name_section } = section
    // console.log('--section--', section)
    /** Creamos un file y actualizamos section */
    let sent = section.sent 

    let start_time = moment().tz("America/Lima").format(format) 

    const file = await File.findById(id_activity)
    const { title, type, description} = file
    // Verificamos si ya existe el file con su respectivo tipo
    // console.log(nickname, title, type, name_section)
    const userFileExisting = await UserFile.findOne({nickname, type, title, name_section})
    // console.log(!!userFileExisting)
    if(userFileExisting){
        file.number_of_downloads = 1
        return res.status(200).json({message:'actividad ya descargada'})
    }
    
    if(!userFileExisting){

      const userFile = new UserFile({
        nickname:nickname,
        region:region,
        name_section:section.name_section,
        component:section.component,
        user:_id,
        name_module:section.name_module,
        type:type,
        title:title,
        description: description,
        start_time:start_time
      })

      sent.push(userFile._id)
      
      await userFile.save()
      
    }
    section.sent = sent
    await section.save()
    console.log('user file modificado', userFileExisting)
    
    /** ====================================== */
    

    res.status(200).json({
        message : "Archivo(s) de la actividad subidos correctamente ",
        activity : section
    })
})
  
export default startOfActivity