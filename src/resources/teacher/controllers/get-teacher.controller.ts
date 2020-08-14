const getTeacher = (Model, Model2) => async (req, res,next) => {
  let User = Model
  let Course = Model2
  let data;
  let courses;

  const nickname = req.body.nickname

  if(nickname) {
    data = await User.findOne({nickname:nickname})
    courses = await Course.find({id_user:data._id}).select('_id')
    data.courses = courses
    data.save((err) => {
      if(err) res.status(500).json({
        message:'Error al guardar user',
        user: data
      })
    })
  }else{
    data = await Model.find() 
  }

  res.status(200).json({
    message:'Lista de profesores',
    data:data
  })
}

export default getTeacher
