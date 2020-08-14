import catchAsync from "../../../utils/catchAsync";

const error_message: String = "Error en el controlador para recuperar estudiantes"

const getStudents = Model => catchAsync(error_message, async (req, res, next) => { 

    const id_teacher = req.user._id
    const iiee = req.user.iiee
        
    let students: [] = await Model.find({ teacher: id_teacher })
    
    if (!students) res.status(500).json({
        message: "No se encontraron resultados"
    })
    
    res.status(200).json({
        institucion: iiee,
        data: students
    })
})

export default getStudents