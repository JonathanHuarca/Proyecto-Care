import catchAsync from "../../../utils/catchAsync";

const error_message: String = "Error en controlador para borrar estudiante"

const deleteStudent = (Model) => catchAsync(error_message, async (req, res, next) => {
    const id_student = req.body.id_student
    
    const student = await Model.findByIdAndRemove(id_student)

    if (!student) res.status(500).json({
        message: 'No se pudo eliminar el estudiante'
    })

    res.status(200).json({
        message: "student remove",
    })
})
 
export default deleteStudent