const verifyRol = (Model, id) => async (req, res, next )=> {
  const user = await Model.findById(id).select('rol')
  if(user){
    return user.rol
  }
  res.status(500).json({
    message:'Rol no verificado'
  })
} 

export default verifyRol