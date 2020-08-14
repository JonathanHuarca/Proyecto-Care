import { User } from './../../services/auth/user/models/user.model';
import * as controller from './controllers'
import {adModel} from './model';

const adviser = async (req, res, next) => {
    const fname = req.body.fname
    const rol = req.user.rol

    switch (fname) {
        case 'newAd':           
                controller.newAd(adModel)(req, res, next)
            break;   
        case 'getAds':           
                controller.getAds(adModel)(req, res, next)
            break;     
        
        default:
            res.status(500).json({
                message: 'Función no encontrada'
            })
            break;
    }
}

export default adviser