import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en add-course controlador'

const addCourse = Model => catchAsync(msgErrorController, async (req, res, next) => {
  const course = await Model.create(req.body)
  res.status(200).json({
    message:'Curso creado',
    course:course
  })
})

export default  addCourse 