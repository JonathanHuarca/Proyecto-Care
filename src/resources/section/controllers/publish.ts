import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en publish controlador'

const publish = (Module,UserModule,Section, UserSection,File,UserFile,LastSection) => catchAsync(msgErrorController,async (req, res) => {
    const { id_module } = req.body

    const module = await Module.findById(id_module)
    const { component, name_module } = module

    if(module.publish){

      const deleteUserModules  = await UserModule.deleteMany({component, name_module})
      const deleteUserSections = await UserSection.deleteMany({component, name_module})
      const deleteUserFiles    = await UserFile.deleteMany({component, name_module})
      const deleteUserLastSections = await LastSection.deleteMany({component, name_module})

      module.publish = false
      module.save()

      return res.status(200).json({
        message : `Module ${module.component} - ${module.name_module} despublicado`,
        module : module
      })
    }

    if(!module.publish){
      module.publish = true
      module.save()

      return res.status(200).json({
        message : `Module ${module.component} - ${module.name_module} publicado`,
        module : module
      })
    }

    
})
  
export default publish