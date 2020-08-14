import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en get module controlador'

const deleteModule = (Module, UserModule, Section, UserSection, File, UserFile, LastSection) => catchAsync(msgErrorController,async (req, res) => {

    const { id_module } = req.body
    const module = await Module.findById(id_module)
    const { component , name_module } = module

    const deleteModule   = await Module.findByIdAndRemove(id_module)
    const deleteSections = await Section.deleteMany({component, name_module})
    const deleteFiles    = await File.deleteMany({component, name_module})

    const deleteUserModules  = await UserModule.deleteMany({component, name_module})
    const deleteUserSections = await UserSection.deleteMany({component, name_module})
    const deleteUserFiles    = await UserFile.deleteMany({component, name_module})
    const deleteUserLastSections = await LastSection.deleteMany({component, name_module})
    
    res.status(200).json({
      message : `Module eliminado con el  id:${id_module}`,
      module : module
    })

})
  
export default deleteModule