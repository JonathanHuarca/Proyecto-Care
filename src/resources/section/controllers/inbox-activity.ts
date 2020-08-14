import catchAsync from "../../../utils/catchAsync"

const errorMessage: String = "Error en inbox activity controller"

const inboxActivity = (Activity, Download) => catchAsync(errorMessage, async (req, res) => {

    const components = {
        2: 'socioemocional',
        3: 'pedagógico',
        6: 'gestión',
    }
    
    const rol = req.user.rol
    if (rol === 2 || rol === 3 || rol === 6) {
        const activities = await Activity.find({ component: components[ rol ] }).select('files')

        if (!activities)
            res.status(500).json({
                message: 'No se encontraron resultados'
            })

        res.status(200).json({
            message: "Actividades de profesores",
            activities: activities
        })
    } else { 
        res.status(401).json({
            message: "Rol no permitido"
        })
    }
    

})

export default inboxActivity 