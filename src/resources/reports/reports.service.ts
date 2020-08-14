import Report from './models'
import downloadModel from '../download/models'
import * as controller from './controllers'
import { User } from '../../services/auth/user/models'

const report = async (req, res, next) => { 
   const fname = req.body.fname
   const rol = req.user.rol

   switch (fname) { 
      case 'addReport':
         if (rol === 7) {
            controller.saveReports(Report,downloadModel)(req, res, next)
            break
         } else { 
            res.status(401).json({
               message: 'Rol no permitido'
            })
         }
      
      case 'getReports':
         //if (rol === 1 || rol === 0) {
            controller.getReports(Report)(req, res, next)
            break;
         //} else { 
            /*res.status(401).json({
               message: 'Rol no permitido'
            })*/
         //}
      case  'addReportExcel':
         if(rol === 7){
            controller.addReport(Report,downloadModel)(req,res,next)
         }else{
            res.status(401).json({
               message : "Rol no permitido"
            })
         }         
         break;
      case  'addReportExcel-s3':
         if(rol === 7){         
            controller.addReports3(Report,downloadModel)(req,res,next)        
         }else{
            res.status(401).json({
               message : "Rol no permitido"
            })
         }
         break;
      case 'getReportsAdmin' :
         if(rol === 0 || rol === 1){
            controller.getReportsAdmin(Report,User)(req,res,next)
         }else{
            res.status(401).json({
               message : "Rol no permitido"
            })
         }         
         break;

      default:
         res.status(500).json({
            message: "Función no encontrada"
         })
         break
   }
}

export default report