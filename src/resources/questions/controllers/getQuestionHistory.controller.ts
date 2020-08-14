import catchAsync from "../../../utils/catchAsync";

const errorMessage: String = "Error en controlado get question"

const getQuestionHistory = (ModelQ) => catchAsync(errorMessage, async (req, res) => { 
    const id_teacher = req.body.id_teacher
    const section = req.body.section
    const block = req.body.block
    const number_module = req.body.module

    const all_questions = []

    const questions = await ModelQ.find( { askedBy: id_teacher, section: section, block: block, module: number_module } ).sort( [ [ 'createdAt', 'descending' ] ] )

    if ( !questions )
        res.status( 500 ).json( { message: 'question not found' } )
    else { 
        questions.forEach( q => {
            const question = {
                question: "",
                answer: "Esta pregunta no tiene respuesta aún",
                files_answer: [],
                files_question: []
            }

            question.question = q.question
            if ( q.answer )
                question.answer = q.answer
            
            q.files.forEach( file => {
                if ( file.uploadedByTeacher === false ) {
                    question.files_answer.push( file )
                } else { 
                    question.files_question.push( file )
                }
            });
            
            all_questions.push(question)
        });
    }    
    
    res.status(200).json({
        message: 'questions founded',
        question: all_questions
    })
})

export default getQuestionHistory