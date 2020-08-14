import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en add teachers in admin controlador'

const addModulo = Model => catchAsync(msgErrorController,async (req, res) => {
  
    req.body.created_by = req.user._id
    const modulo = await Model.create(req.body)
    res.status(200).json({
      message : "modulo agregado correctamente",
      modulo : modulo
    })

})
  
  export { addModulo }