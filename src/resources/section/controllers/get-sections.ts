import catchAsync from '../../../utils/catchAsync'
const msgErrorController = 'Error en getSections controlador'

const resMessage = (codeStatus, message) => (req, res, next) => res.status(codeStatus).json(message);
  
const getSections = (Module, Section, UserSection) => catchAsync(msgErrorController,async (req, res, next) => {
  /** Capturamos nickname de usuario registrado*/
  const { 
    nickname,
    rol
  } = req.user
  /** Capturamos campos enviados desde el cliente  */
  const {
    id_module
  } = req.body

  const { component, name_module } = await Module.findById(id_module)

  /** total de secciones por usuario usando count()*/
  const totalSections = await UserSection
  .find({
    nickname, 
    name_module, 
    component})
  .countDocuments()

  /** Hacemos la consulta de secciones por nickname */  
  let sections = []
  switch(rol){
    case 1:
      sections = await Section.find({
        nickname, 
        name_module, 
        component
      })
      .sort({section:1})  
      .populate({ 
        path: "files", 
        model: "files" 
      })
      .lean()
      break;
    default:
      sections = await UserSection.find({
        nickname, 
        name_module, 
        component
      })
      .sort({section:1})
      .populate({ 
        path: "files", 
        model: "files" 
      })
      .lean()
      break;
  }
 
  /** ============================================= */  
  
  
  const msgOptions = {
    message:'Lista de secciones',
    sections: sections,
    totalSections:totalSections
  }
  
  resMessage(200, msgOptions)(req, res, next)

})

export default getSections