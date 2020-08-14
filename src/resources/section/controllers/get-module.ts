import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en get module controlador'

const getModule = Model => catchAsync(msgErrorController,async (req, res) => {

    const {id_module } = req.body

    const module = await Model.findById(id_module)

    res.status(200).json({
      message : `Module con id:${id_module}`,
      module : module
    })

})
  
export default getModule