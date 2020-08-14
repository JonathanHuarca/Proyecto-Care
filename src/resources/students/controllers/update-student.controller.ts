import catchAsync from "../../../utils/catchAsync";

const error_message: String = "Error en el contralado para actualizar estudiante"

const updateStudent = Model => catchAsync(error_message, async (req, res, next) => { 
    const id_student = req.body.id_student

    const student = await Model.findOne({ _id: id_student })

    student.name = req.body.name || student.name
    student.dni = req.body.dni || student.dni
    student.age = req.body.age || student.age
    student.code = req.body.code || student.code
    student.covid = req.body.covid || student.covid
    student.attorney = req.body.attorney || student.attorney
    student.origin = req.body.origin || student.origin
    
    student.save()
    
    res.status(200).json({
        message: 'updated student',
        student: student
    })
})

export default updateStudent