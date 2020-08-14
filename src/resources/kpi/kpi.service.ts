import * as controller from './controllers'
import { User } from '../../services/auth/user/models/index'
import {modulo} from '../Modulo/modulo.model'
import Question from '../questions/models';
import kpiModel from './model';
const kpi = async (req, res, next) => {
    const fname = req.body.fname
    const rol = req.user.rol
    switch (fname) {
        case 'addKpi':
            controller.addKpi(kpiModel,modulo,User)(req,res,next)
            break;
        case 'editKpi':
            if(rol === 0 || rol === 1){
                controller.editKpi(kpiModel)(req,res,next)
            }else{
                res.status(401).json({
                    message : 'Rol no permitido'
                })
            }
            break;
        case 'getKpiData':
            if(rol === 0 || rol === 1 || rol === 7){
                controller.getKpiData(kpiModel)(req,res,next)
            }else{
                res.status(401).json({
                    message : 'Rol no permitido'
                })
            }
            break;
        case 'deleteKpi':
            if(rol === 0 || rol === 1){
                controller.deleteKpi(kpiModel)(req,res,next)
            }else{
                res.status(401).json({
                    message : 'Rol no permitido'
                })
            }
            break;
        case 'getKpi' : 
            controller.getKpi(kpiModel)(req,res,next)
            break;
        case 'getManyKpis' :
            controller.getManyKpis(kpiModel)(req,res,next)
            break;
        case 'getTeachersRanking' :
            controller.getTeacherRanking(kpiModel,Question,User)(req,res,next)
            break;
        default:
            res.status(500).json({
                message: 'Función no encontrada'
            })   
            break;
    }
}

export default kpi
