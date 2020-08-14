import catchAsync from '../../../utils/catchAsync'
//
let msgErrorController = 'Error en add kpi controlador'

const addKpi = (Model,Model2,Model3) => catchAsync(msgErrorController,async (req, res) => {
    const modulo = await Model2.findById(req.body.id_modulo)
    const teacher = await Model3.findById(req.body.id_teacher)

    if(!modulo || !teacher){
        res.status(500).json({
            message : "usuario o modulo no encontrado(s), verifique los datos"
        })
    }

    if(teacher.rol === 4){
        let region_code = null
        if(teacher.region === 'amazonas' || teacher.region === 'cajamarca'){
            region_code = 0
        }
        if(teacher.region === 'huanuco' || teacher.region === 'pasco'){
            region_code = 1
        }
        req.body.cod_region = region_code
        const kpi = await Model.create(req.body)
        res.status(201).json({
            message : "kpi creado correctamente",
            kpi : kpi
        })
    }else{
        res.status(400).json({
            message : "user no tiene rol de teacher"
        })
    }
  })
  
  export { addKpi }