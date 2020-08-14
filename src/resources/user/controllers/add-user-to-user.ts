import catchAsync from '../../../utils/catchAsync'
//
let msgErrorController = 'Error en add user to user controlador'

const addUserToUser = Model => catchAsync(msgErrorController,async (req, res) => {
    const id_dest_user = req.body.id_dest_user
    const id_user = req.body.id_user

    const originUser = await Model.findById(id_dest_user)
    const user = await Model.findById(id_user).select('_id name lastname rol')
    
    const userExisting = originUser.usersInCharge.find(item => item._id == id_user)
    
    if(userExisting){
        return res.status(200).json({
            message:'Usuario ya está agregado'
        })
    }
    
    originUser.usersInCharge.push(user)
    originUser.save()

    res.status(200).json({
        message:`Usuario ${user.nickname} a ${originUser.nickname}`,
        originUser: originUser
    })
    // if(!gestor || !user ){
    //     res.status(500).json({
    //         message : "usuario(s) no encontrado(s), verifique los datos"
    //     })
    // }


    // if(gestor.rol === 6){
    //     if(user.rol === 2 || user.rol ===3){
    //         gestor.usersInCharge.push({
    //             id_user : req.body.id_user,
    //             added_by : req.user._id
    //         })
        
    //         await gestor.save()
    //         res.status(200).json({
    //             message : "usuario vinculado correctamente con gestor"
                
    //         })
    //     }else{
    //         res.status(400).json({
    //             message : "error usuario ingresado (id_user) no cumple con el rol de Asesor Pedagogico o Psicologo"
    //         })
    //     }
    // }else{
    //     res.status(400).json({
    //         message : "error usuario ingresado (id_gestor) no cumple con el rol de gestor"
    //     })
    // }
  })
  
  export { addUserToUser }