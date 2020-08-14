import catchAsync from "../../../utils/catchAsync";

const error_message: String = "Error el controlador para conseguir estudiante"

const getStudent = Model => catchAsync(error_message, async (req, res, next) => { 
    const id_student = req.body.id_student

    const student = await Model.findById(id_student)

    if (!student) res.status(500).json({
        message: 'No se encontró el estudiante'
    })

    res.status(200).json({
        message: 'student founded',
        student: student
    })
})

export default getStudent