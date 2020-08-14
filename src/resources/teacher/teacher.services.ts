import { User } from '../../services/auth/user/models'
import { Course } from '../course/models'

import * as controller from './controllers'

const teacher = async (req, res, next) => {
    const fname = req.body.fname
    const rol = parseInt(req.user.rol) 
    console.log(rol)
    switch (fname) {
        case 'getTeacher':
            if(rol === 0 || rol === 1 || rol === 3){
                controller.getTeacher(User, Course)(req, res, next)
            }else{
                res.status(500).json({
                    message:'Rol no permitido'
                })
            }
            break;

        case 'createTeacher':
            if(rol == 0 || rol == 1 ){
                controller.getTeacher(User, Course)(req, res, next)
            }else{
                res.status(500).json({
                    message:'Rol no autorizado'
                })
            }
            break;

        case 'updateTeacher':
            if(rol === 0 || rol === 1){
                controller.getTeacher(User, Course)(req, res, next)
            }else{
                res.status(500).json({
                    message:'Rol no autorizado'
                })
            }
            break;

        case 'deleteTeacher':
            if(rol === 0 || rol === 1){
                controller.getTeacher(User, Course)(req, res, next)
            }else{
                res.status(500).json({
                    message:'Rol no autorizado'
                })
            }
            break;
        default:
            controller.notFound(req, res, next)
            break;
    }
}

export default teacher