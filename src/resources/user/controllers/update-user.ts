import catchAsync from '../../../utils/catchAsync'
//
let msgErrorController = 'Error en update user controlador'

const updateUser = Model => catchAsync(msgErrorController,async (req, res) => {
    
    const user = await Model.findOne({_id:req.body.id_user})

    user.name = req.body.name || user.name
    user.lastname = req.body.lastname || user.lastname
    user.usersInCharge = []
    user.save()
    res.status(200).json({
        message:`Usuario ${user.nickname} actualizado`,
        user: user

    })
    
  })
  
  export { updateUser }