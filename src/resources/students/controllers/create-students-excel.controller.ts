import catchAsync from "../../../utils/catchAsync"
import XLSX from 'xlsx'

const errorMessage: String = "Error en create student controller"

const createStudents_excel = Model => catchAsync(errorMessage, async (req, res) => {
    
    const wb = XLSX.read(req.files.file.data)
    const pages = wb.SheetNames
    const ws = wb.Sheets[pages[0]]
    const pageJson = XLSX.utils.sheet_to_json(ws)
    
    pageJson.forEach(student => {

        const name = student['Estudiante']
        const dni = student['DNI']
        const code = student['Código SIS']
        const age = student['Edad']
        const covid = student['Tiene Covid']
        const attorney = student['Nombre del Apoderado']
        const origin = student['Dónde vive?']
        const id_teacher = req.user._id
        
        const new_student = new Model({
            name: name,
            dni: dni,
            code: code,
            covid: covid,
            age: age,
            attorney: attorney,
            origin: origin,
            teacher: id_teacher
        })

        new_student.save()
    });
    
    res.status(200).json({
        message: 'Student registered successfully',
    })
})

export default createStudents_excel