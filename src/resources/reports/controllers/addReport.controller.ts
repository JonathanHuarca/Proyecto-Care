import catchAsync from "../../../utils/catchAsync";
import fs from 'fs'
import PdfPrinter from 'pdfmake'
import path from 'path'

const errorMessage: String = "Error en save report controller"

const saveReports = (Model,download_Model) => catchAsync(errorMessage, async (req, res) => { 
   /*const idKpi = req.body.id_kpi
   const content = req.body.content
   const createdBy = req.body.id_coordinator

   const report = new Model({
      idKPI: idKpi,
      content: content,
      created_by: createdBy
   })

   await report.save()

   res.status(200).json({
      message: "Report save successfully",
      report: report
   })*/
   let fonts = { //Necesitamos importar fonts
      Roboto: {
        normal: path.resolve(__dirname, `../../../../fonts/Roboto-Regular.ttf`)
        
      }
    
   };
   let d = new Date();
   let docDefinition = { //toda la data que estara en el pdf
      content: [
         `pdf creado por : ${req.user.nickname}`,
         `fecha de creacion : ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} `,  
         `psdt : backend mejor equipo :v`
      ]
    }    

   let printer = new PdfPrinter(fonts);
   const pathURL = path.resolve(__dirname, `../../../../uploaded_files/reports/${req.user._id}/`)
    if(!fs.existsSync(pathURL)){       //verificamos si existe una carpeta de los reportes del usuario
      fs.mkdirSync(pathURL)            //si no existe creamos una carpeta para el
    }
   
   var pdfDoc = printer.createPdfKitDocument(docDefinition);      //generamos archivo pdf
   const read =fs.readdirSync(pathURL)                // leemos la carpeta destino y vemos cuantos archivos tiene
   const name_file = `Prueba00${read.length+1}.pdf`
   const newPath = path.resolve(__dirname, `../../../../uploaded_files/reports/${req.user._id}/${name_file}`)   
   pdfDoc.pipe(fs.createWriteStream(newPath));   //guardamos el archivo en la carpeta
   pdfDoc.end();
   
   const download = new download_Model({
      file_name : name_file,
      pathURL : newPath
   })

   await download.save()

   const report = new Model({
      name_report : name_file,
      pathURL : newPath,
      download_id : download._id,
      preview : `/pdf/reports/${req.user._id}/${name_file}`,
      created_by: req.user._id
   })

   await report.save()
   res.status(200).json({
      message : "Reporte en PDF Guardado",
      report : report
   })
})

export default saveReports