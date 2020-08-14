import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en delete user controlador'

const deleteKpi = Model => catchAsync(msgErrorController,async (req, res) => {
    const kpi = await Model.findById(req.body.id_kpi)
    if(!kpi){
      res.status(500).json({
        message : "Usuario no encontrado"
      })  
    }
    await Model.findByIdAndDelete(req.body.id_kpi)

    res.status(200).json({
      message : "kpi deleted",
      kpi: kpi
    })
})
  
  export { deleteKpi }