import catchAsync from "../../../utils/catchAsync"

const errorMessage: String = "Error get questions controller"

const getQuestions = Model => catchAsync(errorMessage, async (req, res) => {
    const questions = await Model.find()

    res.status(200).json({
        message: 'All questions',
        questions: questions
    })
})

export default getQuestions