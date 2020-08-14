import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en edit kpi controlador'

const editKpi = (Model) => catchAsync(msgErrorController,async (req, res,next) => {
    console.log(req.body);
    const kpi = await Model.findById(req.body.id_kpi)
    if(!kpi){
      res.status(500).json({
        message : "kpi not found"
      })
    }

    kpi.id_teacher = req.body.id_teacher || kpi.id_teacher
    kpi.id_modulo = req.body.id_modulo || kpi.id_modulo
    kpi.kpi_data = req.body.kpi_data || kpi.kpi_data

    await kpi.save()
    res.status(200).json({
      message:"kpi updated",
      kpi : kpi
    })
  })
  
  export { editKpi }