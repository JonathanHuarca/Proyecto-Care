import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en getActivityPerRol controlador'

const getActivityPerRol = ( UserSection ) => catchAsync(msgErrorController,async (req, res) => {
  const { rol } = req.user

  const components = {
    2: 'socioemocional',
    3: 'pedagógico',
    6: 'gestión'
  }
  
  const sents = await UserSection
                        .find({component:components[rol]})
                        .select('component name_module files sent')
                        .populate({
                          path: "user", 
                          model: "users",
                          select:'name lastname'
                        })
                        .populate({
                          path: "sent", 
                          model: "user_files",
                          select:'data description type title start_time end_time',
                          match:{
                            type:'activity'
                          }
                        })
                        .lean()
                        

  if( !sents ) res.status(500).json({message:'No existe secciones'})

  res.status(200).json({
    message:`Lista de actividades por ${components[rol]}`,
    sents:sents
  })
})

export default getActivityPerRol