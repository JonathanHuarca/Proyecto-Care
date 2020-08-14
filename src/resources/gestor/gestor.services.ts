import { User } from '../../services/auth/user/models/user.model';
import * as controller from './controllers'
import verifyRol from '../../utils/verifyRol'


const gestorService = async (req, res, next) => { 
    const fname = req.body.fname
    const rol = req.user.rol

    switch (fname) { 
        case 'addTeacher':
            if (rol === 6) {
                controller.addTeacher(User)(req, res, next)
            } else { 
                res.status(401).json({
                    message: 'Rol no permitido'
                })
            }
    }
}

export default gestorService