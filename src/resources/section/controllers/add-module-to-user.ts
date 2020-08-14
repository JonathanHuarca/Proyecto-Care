import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en add module controlador'

/** 
 * Funciones utiles y generales 
 * */

/** options es un objeto */

const find = async ( Model, options, selected) => {
  return await Model.find(options).select(selected)
}
const findOne = async (Model, options, selected) => {
  return await Model.finOne(options).select(selected)
} 

const resMessage = (codeStatus, message) => {
  return(req:any, res:any, next:any) => {
    res.status(codeStatus).json(message);
  }
}

// agregar modulo a usuario
const addModuleToUser = (Module, UserModule, Section, UserSection) => catchAsync(msgErrorController,async (req, res) => {

    const {
      _id,
      nickname,
      region,
      regions
    } = req.user

    const {
      id_module
    } = req.body


    /**
     * Clonar modules de admin a usuario
     */
    const module = await Module.findOne({ _id:id_module,"createdBy.rol":1 }).populate({ path: "info", model: "files" , select:'pdfURL title'})

    const {
      component,
      name_module,
      imageURL, 
      title,
      info
    } = module

    const userModule = await UserModule.find({nickname, component, name_module})
    if(userModule.length) {
      return res.status(200).json({message:`Módulo ya existe para el usuario ${nickname}`})
    }

    if(!userModule.length) {
      const newModule = new UserModule({
        nickname :nickname,
        user:_id,
        region:region,
        regions:regions,
        component :component,
        name_module :name_module,
        imageURL :imageURL,
        title :title,
        info :info
      })
      await newModule.save()
    }
    /***                               */

  /** Clonar secciones a usuario */
    // console.log('verificando secciones del usuario')
    const sections = await Section.find({component, name_module}).select('-_id')
    const userSections = UserSection.find({nickname, name_module, component})
    // console.log(sections)
    if(userSections.length) {
      return res.status(200).json({message:'secciones ya están agregados'})
    }
    // console.log('agregando secciones al usuario')
    // console.log(sections)
    await UserSection.insertMany(sections)
    // console.log('secciones agregadas correctamente')
    await UserSection.updateMany({added:false}, { $set: { user:_id, nickname, region, added:true} });
  /** -------------------------- */
    
    
    /**
     * Mostramos las secciones agregados del módulo
     */
    const getUserSections = await UserSection.find({user:_id, nickname, name_module, component, added:true})
    const newUserModules = await UserModule.find({nickname})


    res.status(200).json({
      message : `Módulo agregado correctamente asuario ${nickname}`,
      activity : getUserSections,
      // sections : getUserSections,
      userModules : newUserModules
    })

})
  
export default addModuleToUser

// const activity = await findOne(Model, options,'') 
    // const activity = await Module.findOne({component, module})
    // const activities = await Module.find({module}).select('-_id')

    
    // const selected = '-_id'
    // const activities = await findOne(Model,options, selected)
    
    // if(activity.nickname === req.user.nickname){
    //   return res.status(200).json({
    //     message:'Modulo ya agregado'
    //   })
    // }
    
    // const optsExistingModule = {
    //   nickname,
    //   module
    // }
    // const existingModule = await find(Model2,optsExistingModule, '')

    // if(existingModule.length !== 0){
      
    //   return res.status(200).json({
    //     message:`modulo ${module} para usuario ${nickname} ya está agregado`
    //   })
    // }

    // await Model2.insertMany(activities)
    // await Model2.updateMany({added:false}, { $set: { nickname, added:true} });