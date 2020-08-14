import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en add resolve controlador'

const addResolve = Model => catchAsync(msgErrorController,async (req, res) => {

    req.body.nickname = req.user.nickname
    const questionResolve = req.body.questionResolve || []
    const pollResolve = req.body.pollResolve || []

    const id_section = req.body.id_section
    const type = req.body.type

    const section = await Model.findById(id_section)
    if(type ==='cuestionario'){
      section.questionResolve  = questionResolve
    }else if(type ==='encuesta'){
      section.pollResolve  = pollResolve     
    }
    section.save()
    
    res.status(200).json({
      message : "Sección con respuestas",
      section : section
    })

})
  
export default addResolve