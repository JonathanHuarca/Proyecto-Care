import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en delete file controlador'

const deleteFile = File => catchAsync(msgErrorController,async (req, res) => {

  const {
    id_file
  } = req.body

  const file = await File.findOne({_id:id_file})

  if(!file){
    return res.status(200).json({
      message : "Archivo no existe"
    })
  }
  
  await File.deleteOne({_id:id_file})

  res.status(200).json({
    message : "Archivo borrado",
    file : file,
  })
})

export default deleteFile