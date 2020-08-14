import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en add question Forum controlador'

const getTeacherForum = (user_model,forum_model) => catchAsync(msgErrorController, async (req, res, next) => {
  const teacherForum = await forum_model.find({members:req.user._id,id_activity:req.body.id_activity} /*{'members.':req.user._id}*/)
  if(teacherForum.length === 0){
      res.status(500).json({
          message : "Usuario no tiene foros"
      })
  }else{
      res.status(200).json({
          message : "Foro de usuario encontrado",
          foro : teacherForum
      })
  }
})

export default  getTeacherForum