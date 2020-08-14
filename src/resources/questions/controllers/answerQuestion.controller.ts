import catchAsync from "../../../utils/catchAsync"
import path from 'path'
import { await } from "signale"
import AWS from 'aws-sdk'

const errorMessage: String = "Error en answer question controller"

const answerQuestion = (Model,model_download) => catchAsync(errorMessage, async (req, res) => {
    const id_question = req.body.id_question
    const id_answerBy = req.body.id_answeredBy
    const answer = req.body.answer

    let question = await Model.findById(id_question)

    if (!question)
        res.status(500).json({
            message: 'Question not found'
        })
    
        question.answeredBy = id_answerBy
        question.answer = answer

    if(!req.files){
        await question.save()
        res.status(200).json({
            message: 'Question answered correctly',
            question : question
        })
    }else{
        const bucket = process.env.BUCKET_NAME
        const s3 = new AWS.S3({
            accessKeyId: process.env.ID,
            secretAccessKey: process.env.SECRET
            })
        const files = []
        if (req.files.file.length >= 2) {
            await Promise.all(req.files.file.map(async (item) => {             
                const params = {
                  Bucket: `${bucket}/questions/${question._id}`,
                  Key:`${item.name}`,
                  Body:item.data,
                  ACL : 'public-read',
                  ContentDisposition: "inline",             
                }                
                const s3File = await s3.upload(params).promise()
                if(!s3File) res.status(500).json({message:'Error al subir archivo'})
                
                question.files.push({
                    url_aws : s3File.Location,
                    uploadedByTeacher : false,
                    name_file: item.name
                })
              }))
        }else{
            let file = req.files.file
            const params = {
                Bucket: `${bucket}/questions/${question._id}`,
                Key:`${file.name}`,
                Body:file.data,
                ACL : 'public-read',
                ContentDisposition: "inline"
            } 
            const s3File = await s3.upload(params).promise()                
            question.files.push({
                url_aws : s3File.Location,
                uploadedByTeacher : false,
                name_file: file.name
            })
        }
            
    //question.files.push(files)
    await question.save()

    res.status(200).json({
        message: 'Question answered correctly',
        question : question
    })
    }

})

export default answerQuestion