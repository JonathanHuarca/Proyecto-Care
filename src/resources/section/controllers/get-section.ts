import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en get activity controlador'

const getActivity = Model => catchAsync(msgErrorController,async (req, res) => {

    const id_section = req.body.id_section

    const section = await Model.findById(id_section)
    res.status(200).json({
      message : "Actividad",
      section:section
    })

})
  
export default getActivity