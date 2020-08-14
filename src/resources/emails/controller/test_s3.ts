import catchAsync from "../../../utils/catchAsync";
import AWS from 'aws-sdk' 

const errorMessage: String = "Error en send email test controller";

const uploadFilesS3 = () => catchAsync( errorMessage, async ( req, res ) => {
    console.log(req.files)
    const bucket_name = process.env.BUCKET_NAME
    const folder_name = 'carpeta04/test01'

    const s3 = new AWS.S3({
        accessKeyId: process.env.ID,
        secretAccessKey: process.env.SECRET
    });

    const params = {
        Bucket: `${bucket_name}/${folder_name}`,        
        Key: req.files.file.name, // File name you want to save as in S3
        Body: req.files.file.data
    }

    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        res.status(200).json({
            message : data.Location
        })
    
    });
    
});

export default uploadFilesS3
