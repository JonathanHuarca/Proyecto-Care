import catchAsync from '../../../utils/catchAsync'
import fs from 'fs' 
import path from 'path'
import AWS, { FSx } from 'aws-sdk'
import { await } from 'signale';
const errorMessage: String = "Error en controlador download attatchment download"

const downloadAWS = (model) => catchAsync(errorMessage, async (req, res, next) => { 
    const fileToDownload = await model.findById(req.params.id_download)
    const name_file = fileToDownload.aws_name_file
	const key = fileToDownload.key
    const bucket_name = process.env.BUCKET_NAME

    const s3 = new AWS.S3({
        accessKeyId: process.env.ID,
        secretAccessKey: process.env.SECRET
    });
    const newPath = path.resolve(__dirname, `../../../../temp/${name_file}`)    
    const params = {
        Bucket: bucket_name,
        Key: key
      };
      const s3File = await s3.getObject(params).promise()
      console.log(s3File);
      if(!s3File) res.status(500).json({message:'Error al descargar archivo'})
      fs.writeFileSync(newPath,s3File.Body)
      res.status(200).download(newPath,name_file)
      /*s3.getObject(params, (err, data) => {
        if (err) {
            res.status(500).json({
                message : "Error al buscar el archivo"
            })
        }else{   
            console.log(data);        
            fs.writeFileSync(newPath, data.Body.toString());
            res.status(200).download(newPath,name_file)
            setTimeout(() => {
                fs.unlinkSync(newPath)
            }, 5000);  
        }      
      });*/
})

export default downloadAWS