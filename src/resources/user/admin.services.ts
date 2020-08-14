import * as controller from './controllers'
import { User, UserTime } from '../../services/auth/user/models'
import { modulo } from '../Modulo/modulo.model'
import { Student } from '../students/models'
import downloadModel from '../download/models'

const teacher = async (req, res, next) =>
{
    const fname = req.body.fname
    //const rol = await verifyRol(User, req.body.id_user)(req, res, next)
    const rol = req.user.rol
    switch (fname)
    {
        case 'addUser':
            if (rol === 0 || rol === 1)
            {
                controller.addUser(User)(req, res, next)
            } else
            {
                res.status(401).json({
                    message: 'Rol no permitido'
                })
            }
            break;
        case 'addUsers_excel':
            if (rol === 0 || rol === 1)
            {
                controller.addUser_excel(User)(req, res, next)
            } else
            {
                res.status(401).json({
                    message: 'Rol no permitido'
                })
            }
            break;
        case 'editUser':
            if (rol === 0 || rol === 1)
            {
                controller.editUser(User)(req, res, next)
            } else
            {
                res.status(401).json({
                    message: 'Rol no permitido'
                })
            }
            break;
        case 'deleteUser':
            if (rol === 0 || rol === 1)
            {
                controller.deleteUser(User)(req, res, next)
            } else
            {
                res.status(401).json({
                    message: 'Rol no permitido'
                })
            }
            break;
        case 'getUsers':
            if (rol === 0 || rol === 1)
            {
                controller.getUsers(User)(req, res, next)
            } else
            {
                res.status(401).json({
                    message: 'Rol no permitido'
                })
            }
            break;
        case 'getUser':
            controller.getUser(User)(req, res, next)
            break;

        case 'updateUser':
            controller.updateUser(User)(req, res, next)
            break;

        case 'addTeachers':
            if (rol === 0 || rol === 1)
            {
                controller.addTeachers(User)(req, res, next)
            } else
            {
                res.status(401).json({
                    message: 'Rol no permitido'
                })
            }
            break;
        case 'addModule':
            if (rol === 0 || rol === 1)
            {
                controller.addModulo(modulo)(req, res, next)
            } else
            {
                res.status(401).json({
                    message: 'Rol no permitido'
                })
            }
            break;
        case 'addUserToUser':
            if (rol === 0 || rol === 1)
            {
                controller.addUserToUser(User)(req, res, next)
            } else
            {
                res.status(401).json({
                    message: 'Rol no permitido'
                })
            }
            break;
        
        case 'getStudentsExcel':
            if (rol === 1)
                controller.getStudentsExcel(Student, User)(req, res, next)
            else
                res.status(401).json({
                    message: "Rol no permitido"
                })
            break;
        case 'logout':
            controller.logout(UserTime)(req, res, next)
            break;
        default:
            res.status(500).json({
                message: 'Función no encontrada'
            })
            break;
    }
}

export default teacher
