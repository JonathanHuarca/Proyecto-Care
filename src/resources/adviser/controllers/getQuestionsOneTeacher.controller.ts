import catchAsync from "../../../utils/catchAsync"
import question from "../../questions/question.service"

const errorMessage: String = "Error en get questions one teacher controller"

const getQuestionOneTeacher = (ModelT, ModelQ) => catchAsync(errorMessage, async (req, res) => { 
    const region_manager = req.user.regions
    const id_teacher = req.body.id_teacher
    const teacher = await ModelT.findById(id_teacher)

    let region_user
    
    region_manager.forEach(region => {
        if (region === teacher.region)
            region_user = region
    });

    const questions = await ModelQ.find({ askedBy: id_teacher, rol: req.user.rol, region: region_user }).select(
        "question module block section files answer createdAt rol region"
    );
    
    if (questions.length === 0)
        return res.json({
            message: 'No se encontraron resultados'
        })

    res.status(200).json({
        message: `Lista de preguntas de ${ teacher.name } ${ teacher.lastname }`,
        questions: questions
    })
    
})

export default getQuestionOneTeacher