import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en edit file controlador'

const editFile = File => catchAsync(msgErrorController,async (req, res) => {

  const {
    nickname
  } = req.user

  const {
    id_file,
    title
  } = req.body
  
  const file = await File.findById(id_file)

  if(!file) res.status(200).json({message:'Archivo no existe'})

  file.nickname = nickname || file.nickname
  file.title = title || file.title
  file.save()

  res.status(200).json({
    message : "Archivo actualizado",
    file : file,
  })
})

export default editFile