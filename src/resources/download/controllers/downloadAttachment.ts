import catchAsync from '../../../utils/catchAsync'
import fs from 'fs' 
import { await } from 'signale';
const errorMessage: String = "Error en controlador download attatchment download"

const download = (model) => catchAsync(errorMessage, async (req, res, next) => { 
    //console.log(req.body);
    //const {name_file,pathURL} = req.body
    const fileToDownload = await model.findById(req.params.id_download)
    const name_file = fileToDownload.file_name
	const pathURL = fileToDownload.pathURL
    if(!name_file || !pathURL){
        res.status(400).json({
            message : "name_file y pathURL son requeridos"
        })
    }
     const file = fs.existsSync(pathURL) //verificar si el archivo existe
     if(!file){
         res.status(400).json({
             message : "Archivo no encontrado, verifique el pathURL"
         })
    }
    //const infoFile = fs.statSync(pathURL)
    //console.log(infoFile);
    
    //const option = {encoding:"buffer"}
    //const xd = fs.readFileSync(pathURL,{encoding:'utf8', flag:'r'})
    //const xd = fs.createReadStream(pathURL)
    //console.log(xd);
    //console.log(xd);
    //res.setHeader('Content-Type','application/pdf')
  //  res.attachment(name_file)
    res.status(200).download(pathURL,name_file)
    //res.status(200).sendFile(pathURL,name_file)
    //res.status(200).send(xd)
    //xd.pipe(res)
})

export default download