import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en delete user controlador'

const deleteUser = Model => catchAsync(msgErrorController,async (req, res) => {
    const user = await Model.findById(req.body.id_user)
    if(!user){
      res.status(500).json({
        message : "Usuario no encontrado"
      })  
    }
    await Model.findByIdAndDelete(req.body.id_user)

    res.status(200).json({
      message : "user deleted",
      user: user
    })
})
  
  export { deleteUser }