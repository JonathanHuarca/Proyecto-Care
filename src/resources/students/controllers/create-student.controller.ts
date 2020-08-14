import catchAsync from "../../../utils/catchAsync"

const errorMessage: String = "Error en create student controller"

const createStudent = Model => catchAsync(errorMessage, async (req, res) => {
    
    const name = req.body.name
    const dni = req.body.dni
    const code = req.body.code
    const age = req.body.age
    const covid = req.body.covid
    const attorney = req.body.attorney
    const origin = req.body.origin
    const id_teacher = req.body.id_teacher
    
    const student = new Model({
        name: name,
        dni: dni,
        code: code,
        covid: covid,
        age: age,
        attorney: attorney,
        origin: origin,
        teacher: id_teacher
    })
    
    await student.save()

    res.status(200).json({
        message: 'Student registered successfully',
    })
})

export default createStudent