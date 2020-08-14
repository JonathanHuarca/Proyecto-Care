import * as controller from './controllers'
import { Capacitation } from './models'

const capacitation = async (req, res, next) => {
    const fname = req.body.fname
    const rol = req.user.rol

    switch (fname) {
        case 'setLink':
            if (rol === 1) 
                controller.setCapacitation(Capacitation)(req, res, next)
            else
                res.status(401).json({
                    message: "Usuario no autorizado"
                })
            break;
        
        case 'getLink':
            controller.getCapacitation(Capacitation)(req, res, next)
            break;
        
        case 'deleteCapacitations':
            controller.deleteCapacitation(Capacitation)(req, res, next)
            break
        
        default:
            res.status(500).json({
                message: "Función no encontrada"
            })
            break;
    }
}

export default capacitation
