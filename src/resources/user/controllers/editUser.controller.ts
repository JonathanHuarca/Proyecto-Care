import catchAsync from '../../../utils/catchAsync'
import AWS from 'aws-sdk'

let msgErrorController = 'Error en edit user controlador'

const bucket = process.env.BUCKET_NAME
const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
})

const removeIDFromTeachers = ( arr, item ) => {
  return arr.filter( ( e ) => e !== item);
};

const editUser = (User) => catchAsync(msgErrorController, async (req, res, next) => {
  const user = await User.findById(req.body.id_user).select('teachers')
  // console.log('USER', user)
  // if(!!req.body.teacher){
    let arrIDTeachers = user.teachers
    if(req.body.teachers){
      await Promise.all(arrIDTeachers.map( async id => {
        let _user = await User.findById(id).select('teachers')
        // console.log('_USER', _user)
        let arr = _user.teachers
        arr.map( idUser => {
          removeIDFromTeachers(arr, idUser)
        })
        _user.save()
      }))
    
      // console.log('teachers!!', req.body.teachers)
      let teachers = JSON.parse(req.body.teachers) || []
      user.teachers = teachers
    
      await Promise.all(teachers.map( async id => {
        
        // console.log('no existe id!!', id)
        let _user = await User.findById(id).select('teachers')
        let arr = _user.teachers
        arr.push(id)
        _user.save
        // console.log('+++++', _user)
      }))
      user.teachers = JSON.parse(req.body.teachers) || user.teachers  
    }
    
  // }
  

  // console.log(user)
  if (!user) {
    res.status(500).json({
      message: "User not found"
    })
  }

  // console.log('files -------', req.files)
  let photo = ''
  if(req.files){
    const image = req.files.image
    const params = {
      Bucket: `${bucket}/test/images/${user.nickname}`,
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
  user.name = req.body.name || user.name
  user.lastname = req.body.lastname || user.lastname
  user.nickname = req.body.nickname || user.nickname
  user.email = req.body.email || user.email
  user.password = req.body.password || user.password
  user.pssd = req.body.password || user.pssd
  user.rol = req.body.rol || user.rol
  user.gender = req.body.gender || user.gender
  user.displayname = req.body.displayname || user.displayname
  user.active = req.body.active || user.active
  user.upgrade = req.body.upgrade || user.upgrade
  user.photo = photo || user.photo
  user.phone = req.body.phone || user.phone
  user.age = req.body.age || user.age
  user.region = req.body.region || user.region
  user.regions = (req.body.regions).toLowerCase().split(',') || user.regions
  user.modular_code = req.body.modular_code || user.modular_code
  user.features_iiee = req.body.features_iiee || user.features_iiee
  user.distrit = req.body.distrit || user.distrit
  user.populated_center = req.body.populated_center || user.populated_center
  user.job = req.body.job || user.job
  user.province = req.body.province || user.province
  user.cellphone = req.body.cellphone || user.cellphone
  user.created_by = req.body.created_by || user.created_by
  user.iiee = req.body.iiee || user.iiee

  await user.save()

  res.status(200).json({
    message: "user updated",
    user: user
  })
})

export { editUser }


