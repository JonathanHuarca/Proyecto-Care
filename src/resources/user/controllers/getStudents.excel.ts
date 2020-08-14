import catchAsync from "../../../utils/catchAsync"
import XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import { Student } from "../../students/models"

const errorMessage: String = "Error en get students excel controller"

const getStudentsExcel = (ModelS, ModelT) => catchAsync(errorMessage, async (req, res) => { 
    const id_teacher = req.body.id_teacher
    const studentsOfTeacher = await ModelS.find({ teacher: id_teacher })
    const teacher = await ModelT.findById(id_teacher)

    let studentsToExcel = []
    
    if (studentsOfTeacher.length === 0)
        res.status(500).json({
            message: "No se encontraron alumnos"
        })

    else {

        // Organizar data de studiantes
        studentsOfTeacher.forEach(student => {
            let studentData = {
                'Nombre y apellidos': student.name,
                'Edad': student.age || '',
                'DNI': student.dni || '',
                'Código SIS': student.code || '',
                '¿COVID?': student.covid || '',
                'Origen': student.origin || ''
            }
            
            studentsToExcel.push(studentData)
        });

        const wb = XLSX.utils.book_new()
        const page01 = XLSX.utils.json_to_sheet(studentsToExcel)
        XLSX.utils.book_append_sheet(wb, page01, "Alumnos")

        page01[ '!cols' ] = [ { width: 40 } ]

        const pathURL = path.resolve(__dirname, `../../../temp/${ req.user._id }/`)
        
        if (!fs.existsSync(pathURL)) {       //verificamos si existe una carpeta de los alumnos del profesor
            fs.mkdirSync(pathURL)            //si no existe creamos una carpeta para el
        }

        const name_file = `Alumnos-${teacher.name}-${teacher.lastname}.xlsx`
        const newPath = path.resolve(__dirname, `../../../temp/${ req.user._id }/${ name_file }`)
        XLSX.writeFile(wb, newPath)

        setTimeout(() => {
            fs.unlinkSync(newPath)
            fs.rmdirSync(pathURL)
        }, 1000);

        res.status(200).download(newPath)

    }

})

export { getStudentsExcel }