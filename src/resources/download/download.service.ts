import * as controller from './controllers'
import downloadModel from '../download/models'
const kpi = async (req, res, next) => {
    const fname = "download_file"
    
    //const rol = req.user.rol
    switch (fname) {
        case 'download_file':
            controller.download(downloadModel)(req,res,next)
            break;       
        
        default:
            res.status(500).json({
                message: 'Función no encontrada'
            })   
            break;
    }
}

export default kpi
