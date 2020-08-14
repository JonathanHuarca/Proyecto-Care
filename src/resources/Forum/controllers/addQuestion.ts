import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en add question Forum controlador'

const addQuestion = (user_model,forum_model) => catchAsync(msgErrorController, async (req, res, next) => {
   const d = new Date()
   const forum = await forum_model.findById(req.body.id_forum)
   if(!forum){
       res.status(500).json({
           message : "Foro no encontrado"
       })
   }else{
       forum.questions.push({
            question : req.body.question,
            askedBy_id : req.user._id,
            askedBy_name : req.user.name,
            askedBy_lastname : req.user.lastname,
            dateOfCreating : `${d.getDay()}/${d.getMonth()+1}/${d.getFullYear()}`
       })
       await forum.save()
       res.status(200).json({
           message : "Pregunta agregada correctamente",
           forum : forum
       })
   }
})

export default  addQuestion