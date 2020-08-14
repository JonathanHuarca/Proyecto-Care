import catchAsync from "../../../utils/catchAsync";
import AWS from 'aws-sdk' 
import path from 'path'
import fs from 'fs'
const errorMessage: String = "Error en send email test controller";

const uploadFilesS3 = () => catchAsync( errorMessage, async ( req, res ) => {
    //console.log(req.files)
    const id = 'AKIAIOSRYFASRWRLXYHQ'
    const secret = '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'
    const bucket_name = process.env.BUCKET_NAME
    const folder_name = 'carpeta01'

    const s3 = new AWS.S3({
        accessKeyId: process.env.ID,
        secretAccessKey: process.env.SECRET
    });
    //const filePath = path.join('temp', 'x' + '.docx');
    const filePath = './Porque es importante la POO.docx';
    const params = {
        Bucket: bucket_name,
        Key: 'carpeta01/Porque es importante la POO.docx'
      };
      s3.getObject(params, (err, data) => {
        if (err) console.error(err);
        console.log(data)
        fs.writeFileSync(filePath, data.Body.toString());
        console.log(`${filePath} has been created!`);
        res.status(200).json({
            message : "xd.docx",
            file : data.Body
        })
      });
    
});

export default uploadFilesS3
