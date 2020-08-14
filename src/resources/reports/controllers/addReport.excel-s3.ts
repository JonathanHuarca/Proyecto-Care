import catchAsync from "../../../utils/catchAsync";
import XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import AWS from 'aws-sdk' 

const errorMessage: String = "Error en save report controller"

const newReport = (Model_report, download_Model) => catchAsync(errorMessage, async (req, res) => {
    const wb = XLSX.utils.book_new()    
     /*const dataJson = [{
         data1 : "xddd",
         data2 : "sadad",
         data3 : "asdasddas"
     }]*/
     
    const page01 = XLSX.utils.json_to_sheet(req.body.table)
    const region = req.body.region
    const report_name = `${req.body.report_name}.xlsx`
    XLSX.utils.book_append_sheet(wb, page01, "pagina01")
    const bucket_name = process.env.BUCKET_NAME
    const folder_name = `reports/${req.user._id}`
    const newPath = path.resolve(__dirname, `../../../../temp/${report_name}`)

    XLSX.writeFile(wb, newPath)    
    const s3 = new AWS.S3({
        accessKeyId: process.env.ID,
        secretAccessKey: process.env.SECRET
    });
    
    const file = fs.createReadStream(newPath)
    if(!file){
        res.status(500).json({
            message : "Archivo no encontrado",
            path : newPath
        })
    }
    const params = {
        Bucket: `${bucket_name}/${folder_name}`,        
        Key: report_name, // File name you want to save as in S3
        Body: file,
        ACL : 'public-read'
    }    
    s3.upload(params, async function(err, data) {
        if (err) {
            //throw err;
            res.status(500).json({
                message : "Error en subida de archivo"
            })
            throw err;
        }else{
            
            /*const download = new download_Model({
                aws_name_file: report_name,
                key: data.key
            })
            await download.save()*/
            const report = new Model_report({
                name_coord : req.user.name,
                lastname_coord : req.user.lastname,
                region: region,
                name_report: report_name,
                //download_id: download._id,
                url_aws : data.Location,
                created_by: req.user._id
            })
            await report.save()
            res.status(200).json({
                message: "report created",
                report: report
            })
            setTimeout(() => {
                fs.unlinkSync(newPath)
            }, 5000);
            
        }       
    
    })
})

export default newReport