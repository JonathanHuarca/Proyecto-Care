import catchAsync from '../../../utils/catchAsync'
import { await } from 'signale'

let msgErrorController = 'Error en add answer to question Forum controlador'

const addAnswer = (user_model,forum_model) => catchAsync(msgErrorController, async (req, res, next) => {
    const d = new Date()
    const findForum = await forum_model.findById({_id:req.body.id_forum})
    if(!findForum){
        res.status(500).json({
            message : "foro no encontrado"
        })
    }else{
    console.log(findForum.questions);
    findForum.questions.forEach(question => {
        if(question._id.toString() === req.body.id_question){
            question.answers.push( 
                {
                answer : req.body.answer,
                answeredBy_id : req.user._id,
                answeredBy_name : req.user.name,
                answeredBy_lastname : req.user.lastname,
                dateOfCreating : `${d.getDay()}/${d.getMonth()+1}/${d.getFullYear()}`
                }
            )
        }
    });
        await findForum.save()
        res.status(200).json({
            message : "Respuesta agregada",
            forum : findForum
        })
    }
})

export default  addAnswer