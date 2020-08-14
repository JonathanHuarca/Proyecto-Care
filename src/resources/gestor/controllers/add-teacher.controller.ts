import catchAsync from "../../../utils/catchAsync";
import verifyRol from "../../../utils/verifyRol";

const msgErrorController: String = "Error en add teacher gestor controller"

const addTeacher = Model => catchAsync(msgErrorController, async (req, res) => { 
    let id_teacher = req.body.id_teacher
    let id_gestor = req.body.id_user

    let teacher = await Model.findById(id_teacher).select('id')
    let gestor = await Model.findById(id_gestor)

    let teachers = gestor.teachers

    teachers.push(teacher)
    gestor.teachers = teachers
    gestor.save()
    
    // Solo para verificar que se agregó teacher a gestor
    let gestor_new = await Model.findById(id_gestor)

    res.status(200).json({
        message: "Profesor agregado a lista de gestor",
        gestor: gestor_new
    })
}) 

export default addTeacher