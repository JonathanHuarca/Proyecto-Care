import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en get User controlador'

const getUser = Model => catchAsync(msgErrorController, async (req, res) => {
  
  if(req.body.id_user){
    const user = await Model.findOne({_id:req.body.id_user}).populate({ 
      path: "teachers", 
      model: "users",
      select:'_id name lastname rol region'
    }).lean()
    // console.log('------------',user)
    return res.status(200).json({
      message: "User encontrado",
      user: user
    })
  }
  
  // const user = await Model.findOne({nickname:req.user.nickname})
  // res.status(200).json({
  //   message: "User found",
  //   user: user
  // })
})

export { getUser }