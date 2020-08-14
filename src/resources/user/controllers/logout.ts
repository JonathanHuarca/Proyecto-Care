import catchAsync from '../../../utils/catchAsync'
import moment from 'moment-timezone'

let msgErrorController = 'Error en logout in admin controlador'

const formatTime = "HH:mm:ss"
let formatDate = "DD/MM/YYYY HH:mm:ss"

const logout = UserTime => catchAsync(msgErrorController,async (req, res) => {
  
    const { user_time } = req.user
    const userTime = await UserTime.findById(user_time)

    userTime.end_time = moment().tz("America/Lima").format('DD/MM/YYYY - HH:mm:ss')
    let duration = moment.utc(moment(userTime.end_time, formatDate).diff(moment(userTime.start_time, formatDate))).format(formatTime)
    userTime.time = moment.duration(duration).asSeconds()
    userTime.save()

    res.status(200).json({
      message : "Hora de cierre de sesión",
      userTime:userTime
    })

})
  
  export { logout }