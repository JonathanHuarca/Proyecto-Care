import catchAsync from '../../../utils/catchAsync'
import AWS from 'aws-sdk'
import { await } from 'signale'
let msgErrorController = 'Error en add user controlador'

const bucket = process.env.BUCKET_NAME
const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
})

const addUser = Model => catchAsync(msgErrorController, async (req, res) => {

    const {
        nickname,
        password,
        rol
    } = req.body

    let photo = ''
    console.log('req.files---', req.files)
    if(req.files){
        const image = req.files.image
        const params = {
          Bucket: `${bucket}/test/images/${nickname}`,
          Key:`${image.name}`,
          Body:image.data,
          ContentDisposition:"inline",
          Metadata: {
            'Content-Type': 'image/jpeg'
          },
          ACL:'public-read'
        }
    
        const s3File = await s3.upload(params).promise()
        if(!s3File) res.status(500).json({message:'Error al subir imagen'})
        photo = s3File.Location
      }


    if ((!nickname || !password || !rol)) {
        return res.status(400).send({
            message: 'need nickname, password and rol'
        })
    }
    const existUser = await Model.findOne({ nickname: nickname })
    if (!existUser) {
        if (req.user.rol > 0) {        //cambiar por el rol del que hace la 
            const string = req.body.teachers || null
            // console.log(string);
            
            // console.log("string",string);
            const teachersArray = JSON.parse(string);
            // console.log("teachersArray",teachersArray);
            req.body.teachers = teachersArray
            
                  
            req.body.created_by = req.user._id
            req.body.photo = photo
            req.body.regions = (req.body.regions).toLowerCase().split(',')
            req.body.pssd = password
            const user = await Model.create(req.body)

            await Promise.all(teachersArray.map(async item => {
                let data = await Model.findById(item)
                let arr = data.teachers
                arr.push(user._id)
                await data.save()
            }))
            
            res.status(201).json({
                message: "user created",
                user : user
            })
        } else {
            res.status(401).json({
                message: "Admin cannot add super Admins"
            })
        }
    } else {
        res.status(400).json({
            message: "Nickname already exists"
        })
    }
})

export { addUser }