import catchAsync from "../../../utils/catchAsync";
import AWS from "aws-sdk";
import moment from 'moment-timezone'

let msgErrorController = "Error en new AD controlador";

const newAd = (Model) =>
  catchAsync(msgErrorController, async (req, res, next) => {
    let date = moment().tz("America/Lima").format('DD/MM/YYYY - HH:mm:ss')
    const ad = new Model({
      content: req.body.content,
      date_created : date
    });
    
    if (req.files) {
      const bucket_name = process.env.BUCKET_NAME;
      const folder_name = `news/${ad._id}`;
      const file = req.files.file;
      const s3 = new AWS.S3({
        accessKeyId: process.env.ID,
        secretAccessKey: process.env.SECRET,
      });
      if (!file.length) {      
        const params = {
          Bucket: `${bucket_name}/${folder_name}`,
          Key: file.name, // File name you want to save as in S3
          Body: file.data,
          ACL: "public-read",
          ContentDisposition: "inline",
          ContentType: 'application/octet-stream',
        };
        if(file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/gif' ||
          file.mimetype === 'image/webp' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/svg+xml'){          
          params.ContentType = file.mimetype
        }
        const s3File = await s3.upload(params).promise();
        if (!s3File) {
          return res.status(500).json({
            message: "Error en subida de archivo",
          });
        } else {
          ad.file.push({
            name_file: file.name,
            aws_url: s3File.Location,
            mimetype : file.mimetype
          });
          await ad.save();
          return res.status(200).json({
            message: "Anuncio creado correctamente",
            ad: ad,
          });
        }
      } else {
        
        await Promise.all(
          file.map(async (file_xd) => {
            
            const params = {
              Bucket: `${bucket_name}/${folder_name}`,
              Key: file_xd.name, // File name you want to save as in S3
              Body: file_xd.data,
              ACL: "public-read",
              ContentDisposition: "inline",
              ContentType: 'application/octet-stream',
            };
          if(
            file_xd.mimetype === 'image/jpeg'|| 
            file_xd.mimetype === 'image/gif' || 
            file_xd.mimetype === 'image/webp'||
            file_xd.mimetype === 'image/png' || 
            file_xd.mimetype === 'image/svg+xml'
            ){          
              params.ContentType = file_xd.mimetype
            }
            const s3File = await s3.upload(params).promise();

            if (!s3File) res.status(500).json({message: "Error en subida de archivo",})  

            ad.file.push({
              mimetype : file_xd.mimetype,
              name_file: file_xd.name,
              aws_url: s3File.Location,
            });            
          })
        );
        await ad.save();
        return res.status(200).json({
          message: "Anuncio creado correctamente",
          ad: ad,
        });
      }
    } else {
      await ad.save();
      return res.status(200).json({
        message: "Anuncio creado correctamente",
        ad: ad,
      });
    }
  });

export default newAd;
