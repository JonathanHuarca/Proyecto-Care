import { User } from './../../services/auth/user/models/user.model';
import * as controller from './controller'
import Question from '../questions/models';

const adviser = async (req, res, next) => {
    const fname = req.body.fname
    const rol = req.user.rol

    switch (fname) {
        case 'sendEmail':           
                controller.sendEmail()(req, res, next)
            break;
        case 'uploadS3':           
            controller.testS3()(req, res, next)
        break;
       
        case 'downloadS3':           
            controller.downloads3()(req, res, next)
        break;
        
        default:
            res.status(500).json({
                message: 'Función no encontrada'
            })
            break;
    }
}

export default adviser