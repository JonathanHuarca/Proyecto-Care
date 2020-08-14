import catchAsync from "../../../utils/catchAsync";
import path from 'path'
//import _ from 'lodash'
import AWS from 'aws-sdk'

const errorMessage: String = "Error en controlado add question"

const addQuestion = (Model,Model_download) => catchAsync(errorMessage, async (req, res) => {
    const module_number = req.body.module
    const section = req.body.section
    const block = req.body.block
    const id_teacher = req.user._id
    const question_content = req.body.question
    const rol = req.body.rol

    const region_user = req.user.region

    const question = new Model({
        module: module_number,
        section: section,
        block: block,
        question: question_content,
        askedBy: id_teacher,
        region : region_user,
        rol: rol,
        files: []
    })
    if (!req.files) {
        await question.save()
        res.status(200).json({
            message: 'question added sin successfully',
            question: question
        })
    } else {
        console.log(req.files.file);
        //const files = []
        //const { file } = req.files
        const bucket = process.env.BUCKET_NAME
        const s3 = new AWS.S3({
        accessKeyId: process.env.ID,
        secretAccessKey: process.env.SECRET
        })
        if(req.files.file.length >= 2){
            
            console.log("muchos archivos");
            await Promise.all(req.files.file.map(async (item) => {
                //let isImage = false
                console.log(item);                
                const params = {
                  Bucket: `${bucket}/questions/${question._id}`,
                  Key:`${item.name}`,
                  Body:item.data,
                  ACL : 'public-read',
                  ContentDisposition: "inline",
                  //Content-disposittion
                  /*Metadata: {
                    'Content-Type': 'application/octet-stream'
                  },*/
                  
                }
                /*if(item.mimetype === 'image/jpeg'){
                    console.log("es imagen");
                    params.ACL = 'public-read'
                    isImage = true
                }*/
                const s3File = await s3.upload(params).promise()
                console.log(s3File);
                if(!s3File) res.status(500).json({message:'Error al subir archivo'})
                /*const download = new Model_download({
                    key:s3File.Key,
                    aws_name_file:item.name,
                    
                    
                })*/
                //await download.save()
                question.files.push({
                    //isImage : isImage,
                    url_aws : s3File.Location,
                    uploadedByTeacher : true,
                    name_file: item.name,                    
                    //download_id : download._id
                })     
                //files.push(file._id) 
              }))
        }else{
            let file = req.files.file
            const params = {
                Bucket: `${bucket}/questions/${question._id}`,
                Key:`${file.name}`,
                Body:file.data,
                ContentDisposition: "inline",
                ACL : 'public-read',
              } 
              const s3File = await s3.upload(params).promise()
              /*const download = new Model_download({
                key:s3File.Key,
                aws_name_file:file.name
            })*/
            //await download.save()
            question.files.push({
                url_aws : s3File.Location,
                uploadedByTeacher : true,
                name_file: file.name,                    
                //download_id : download._id
            })
        }
        //question.files = files
        await question.save()
        res.status(200).json({
            message: 'question added successfully',
            question: question
        })
    }

})

export default addQuestion