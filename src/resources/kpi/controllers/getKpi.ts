import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en get kpi controlador'

const getKpi = Model => catchAsync(msgErrorController,async (req, res) => {
  const kpi = await Model.findById(req.body.id_kpi)
  if(!kpi){
    res.status(500).json({
      message : "kpi no encontrado"
    })
  }
  res.status(200).json({
    message : "Kpi encontrado",
    kpi : kpi
  })

})
  
export { getKpi }