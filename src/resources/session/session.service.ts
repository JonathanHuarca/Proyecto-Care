import { User } from "../../services/auth/user/models"
import Controller from "./controllers"

const session = async (req, res, next) => { 
    const fname = 'logout'

    switch (fname) {
        case 'logout':
            Controller.logoutController(User)(req, res, next)
            break;
    
        default:
            break;
    }
}

export default session