import catchAsync from '../../../utils/catchAsync'


let msgErrorController = 'Error en get many kpis controlador'

const getManyKpis = (Model) => catchAsync(msgErrorController,async (req, res) => {    
    var kpiData = null
    var filter = ""
    if(req.body.id_teacher && req.body.id_modulo){
        res.status(400).json({
            message : "error solo enviar id_teacher o id_modulo"
        })
    }
    if(req.body.id_teacher){
        filter = "teacher"
    }
    if(req.body.id_modulo){
        filter = "modulo"
    }
    switch (filter) {
        case 'modulo':
            if(!req.body.id_modulo){
                res.status(500).json({
                    message : "id de modulo no encontrado, verifique los datos enviados"
                })
            }
            kpiData = await Model.find({id_modulo:req.body.id_modulo})
            if(kpiData.length === 0){
                res.status(500).json({
                    message : "data no encontrada"
                })
            }
            res.status(200).json({
                message : `kpis filtradas por id de modulo : ${req.body.id_modulo}`,
                kpis : kpiData
            })
            break;
        case 'teacher':
            if(!req.body.id_teacher){
                res.status(500).json({
                    message : "id de teacher no encontrado, verifique los datos enviados"
                })
            }
            kpiData = await Model.find({id_teacher:req.body.id_teacher})
            if(kpiData.length === 0){
                res.status(500).json({
                    message : "data not found"
                })
            }
            res.status(200).json({
                message : `kpis filtradas por id de teacher : ${req.body.id_teacher}`,
                kpis : kpiData
            })
            break;        
        default:
            res.status(500).json({
                message: 'necesita proporcionar un filtro para la busqueda (id_teacher o id_modulo)'
            })   
            break;
    }


})
  
export { getManyKpis }