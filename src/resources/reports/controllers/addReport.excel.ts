import catchAsync from "../../../utils/catchAsync";
import XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'

const errorMessage: String = "Error en save report controller"

const newReport = (Model_report, download_Model) => catchAsync(errorMessage, async (req, res) => {
    const wb = XLSX.utils.book_new()
    const pages = wb.SheetNames
    /* const dataJson = [{
         data1 : "xddd",
         data2 : "sadad",
         data3 : "asdasddas"
     }]*/
    const page01 = XLSX.utils.json_to_sheet(req.body.table)
    const region = req.body.region
    XLSX.utils.book_append_sheet(wb, page01, "pagina01")

    const pathURL = path.resolve(__dirname, `../../../../uploaded_files/reports/${req.user._id}/`)
    if (!fs.existsSync(pathURL)) {       //verificamos si existe una carpeta de los reportes del usuario
        fs.mkdirSync(pathURL)            //si no existe creamos una carpeta para el
    }
    const read = fs.readdirSync(pathURL)                // leemos la carpeta destino y vemos cuantos archivos tiene
    const name_file = `Prueba00${read.length + 1}.xlsx`
    const newPath = path.resolve(__dirname, `../../../../uploaded_files/reports/${req.user._id}/${name_file}`)
    XLSX.writeFile(wb, newPath)
    const download = new download_Model({
        file_name: name_file,
        pathURL: newPath
    })
    await download.save()
    const report = new Model_report({
        name_coord : req.user.name,
        lastname_coord : req.user.lastname,
        region: region,
        name_report: name_file,
        download_id: download._id,
        created_by: req.user._id
    })
    await report.save()
    res.status(200).json({
        message: "report created",
        report: report
    })
})

export default newReport