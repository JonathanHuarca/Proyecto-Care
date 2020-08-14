import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en get Users controlador'

const getUsers = Model => catchAsync(msgErrorController,async (req, res) => {
  const rol = req.body.rol || ''
  let users = []
  let usersByRol = []

  await Promise.all(rol.split('').map( async (rol) => {
    const data = await Model
                        .find({rol})
                        .populate({ 
                          path: "teachers", 
                          model: "users",
                          select:'_id name lastname rol region'
                        })
    users.push(...data);
    
    usersByRol = [...usersByRol, data]
  }))
  
  res.status(200).json({
    message : `users found with role ${rol.split('')}`,
    users : users,
    usersByRol:usersByRol
  })
})
  
  export { getUsers }