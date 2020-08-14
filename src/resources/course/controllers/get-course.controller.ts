import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en get-course controlador'

const addCourse = Model => catchAsync(msgErrorController, async (req, res, next) => {
  const id_course = req.body.id_course
  const id_user = req.body.id_user
  let data;
  if(id_course){
    data = await Model.findOne({_id:id_course})
  }else if(id_user){
    data = await Model.find({id_user})
  }else{
    data = await Model.find()
  }
  
  res.status(200).json({
    message:'Cursos',
    data:data
  })
})

export default  addCourse 