import catchAsync from "../../../utils/catchAsync"
import moment from "moment";

const errorMessage: String = "Error en logout controller"

const logoutController = ( Model ) => catchAsync( errorMessage, async (req, res) => { 
    // Registrar la última hora de inicio de sesión
    const user = await Model.findOne( { nickname: req.user.nickname } )
    const logout_date = req.body.logout_date

    if ( !user )
        req.status( 500 ).json( {message: 'No se encontró el usuario'} )

    user.session_end = logout_date

    // Guardar tiempo la diferencia de tiempo de la última sesión iniciada
    let f_1 = user.session_end
    let f_2 = user.session_init

    let duration_time = moment.utc(moment(f_1, "DD/MM/YYYY HH:mm:ss").diff(moment(f_2, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")

    let params = duration_time.split(':')
    let all_time = moment(user.duration, "HH:mm:ss").add(params[ 0 ], 'hours').add(params[ 1 ], 'minutes').add(params[ 2 ], 'seconds').format("HH:mm:ss")

    if (user.duration === 'Invalid date' || user.duration_seconds === 'Invalid date') {
        user.duration = ''
        user.duration_seconds = 0
    } else {
        user.duration = all_time
        user.duration_seconds =  moment.duration(all_time).asSeconds()
    }

    user.save()

    res.status( 200 ).json( {
        message: "Hora y fecha de salida registrada correctamente",
        session: user
    })
    
})

export default logoutController