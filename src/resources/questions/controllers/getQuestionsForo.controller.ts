import catchAsync from "../../../utils/catchAsync"

const errorMessage: String = "Error en get questions foro controller"

const getQuestionForo = (ModelQ, ModelU) => catchAsync(errorMessage, async (req, res, next) => { 
    const module_number = req.body.module
    const block = req.body.block
    const section = req.body.section

    const all_questions = []
    const questions = await ModelQ.find({ module: module_number, block: block, section: section })
    
    if (!questions)
        res.status(500).json({ message: "questions not found" })
    else { 
        questions.forEach(async q => {

            const user_answer = await ModelU.findById(q.answeredBy)
            const user_question = await ModelU.findById(q.askedBy)

            const question = {
                askedBy: "",
                answeredBy: "",
                question: "",
                answer: "Esta pregunta no tiene respuesta aún",
                files_answer: [],
                files_question: [],
                dateCreation: ''
            }

            console.log(user_question.id)

            // Llenado de datos 
            question.question = q.question
            question.dateCreation = q.createdAt
            if (q.answer) question.answer = q.answer
            if (user_answer) question.answeredBy = `${user_answer.name} ${user_answer.lastname}`
            if (user_question) question.askedBy = `${user_question.name} ${user_question.lastname}`
            

            q.files.forEach(file => {
                if (file.uploadedByTeacher === true)
                    question.files_question.push(file)
                else 
                    question.files_answer.push(file)
            });

            all_questions.push(question)

            if (all_questions.length === questions.length)
                res.status(200).json({
                    message: 'question founded',
                    question: all_questions.sort((a, b) => { 
                        a = new Date(a.dateCreation);
                        b = new Date(b.dateCreation);
                        return a > b ? -1 : a < b ? 1 : 0;
                    })
                })    
        });
    }

})

export default getQuestionForo