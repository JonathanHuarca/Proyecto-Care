import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en add teachers in admin controlador'

const addTeachers = Model => catchAsync(msgErrorController,async (req, res) => {
    const userDestination = await Model.findById(req.body.id_UserDestination)
    const userTeacher = await Model.findById(req.body.id_teacher)
    if(userTeacher.rol === 4 || userTeacher.rol === 5 ){ //verificamos si es docente o directivo
        if(userTeacher.rol === 4){ //validamos si es un profesor docente 
            if(userDestination.rol === 2||userDestination.rol === 3 ){ //un docente solo se relaciona solo con piscologo o asesor
                userDestination.teachers.push({
                    id_teacher : req.body.id_teacher,
                    added_by : req.user._id
                })
                await userDestination.save()    
                res.status(200).json({
                    message : "docente add",
                    user : userDestination.teachers
                })
            }else{
                res.status(400).json({
                    message : "docente solo se puede relacionar con piscologo y asesor"
                })
            }
        }
        if(userTeacher.rol === 5){ //validamos si es un docente directivo
            if(userDestination.rol === 2 || userDestination.rol === 3 || userDestination.rol === 6){
                userDestination.teachers.push({
                    id_teacher : req.body.id_teacher,
                    added_by : req.user._id
                })
                    await userDestination.save()    
                    res.status(200).json({
                        message : "directivo add",
                        user : userDestination.teachers
                    })
                }else{
                    res.status(400).json({
                        message : "docente directivo solo se puede relacionar con piscologo, asesor y/o gestor"
                    })
                }
            }
    }else{
        res.status(400).json({
            message : "usuario necesita ser docente o directivo"
        })
    }  

    })
  
  export { addTeachers }