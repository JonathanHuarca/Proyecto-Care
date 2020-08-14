import  catchAsync from '../../../utils/catchAsync'

const msgErrorController = 'Error en notFound controlador'
const notFound = catchAsync(msgErrorController, async (req, res, next) => {
  res.status(500).json({ message: 'Función no encontrado' })
})

export default notFound