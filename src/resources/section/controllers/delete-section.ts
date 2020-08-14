import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en delete section controlador'

const deleteSection = Section => catchAsync(msgErrorController,async (req, res, next) => {

  const {
    id_section,
  } = req.body
  
  const section = await Section.findById(id_section)
  
  if(!section) res.status(500).json({message:'sección no existe'})

  await Section.deleteOne({_id:id_section})

  res.status(200).json({
    message : "Sección eliminado correctamente",
    section : section
  })
})

export default deleteSection