
import catchAsync from './catchAsync'


const protectRol = catchAsync("Error en la consulta",async(req, res, next) => {
    
    const codRol = req.body.rol
    const url = req.originalUrl
    const findRol = url.split("/")
    const rolString = findRol[2]
    switch (rolString) {       

        case 'admin':
            if(codRol === 1){
                next()
            }else{
                res.status(401).json({message : "No cuenta con permiso para acceder"})
            }
            break;        
        case 'teacher':
            if(codRol === 2){
                next()
            }else{
                res.status(401).json({message : "No cuenta con permiso para acceder"})
            }
            break;
        case 'student':
            if(codRol === 3){
                next()
            }else{
                res.status(401).json({message : "No cuenta con permiso para acceder"})
            }
            break;       

        default:

            break;
    }
    /*if(codRol === 1){
        next()
    }else{
        res.status(401).json({message : "No cuenta con permiso para acceder"})
    }
    */
})

export { protectRol }