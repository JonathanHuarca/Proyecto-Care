import { User } from './../../services/auth/user/models/user.model';
import * as controller from './controllers'
import Question from '../questions/models';

const adviser = async (req, res, next) => {
    const fname = req.body.fname
    const rol = req.user.rol

    switch (fname) {
        case 'getTeachers':
            if (rol === 2 || rol === 3 || rol === 6)
                controller.getTeachers(User)(req, res, next)
            else
                res.status(401).json({
                    message: 'Rol no autorizado'
                })
            break;

        case 'getQuestionsOfTeachers':
            if (rol === 2 || rol === 3 || rol === 6)
                controller.getQuestionsOfTeachers(User, Question)(req, res, next)
            else
                res.status(401).json({
                    message: 'Rol no permitido'
                })
            break;
        
        case 'getQuestionOneTeacher':
            controller.getQuestionOneTeacher(User, Question)(req, res, next)
            break;

        default:
            res.status(500).json({
                message: 'Función no encontrada'
            })
            break;
    }
}

export default adviser