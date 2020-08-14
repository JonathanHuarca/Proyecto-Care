import { newToken } from '../controllers'
import moment from 'moment-timezone'
import { User, UserTime } from '../models/'

const rol = {
    "01": 'admin o superadmin',
    "7": 'coordinador',
    "236": 'asesor, psicólogo o gestor',
    "45": 'docente o directivo'
}

const selectRol = (value, userRol) => {
    if(userRol === ''){
        return false
    }
    return (value || '').split('').includes((userRol).toString())
}

export const signin = async (req, res) => {
    if (!req.body.nickname || !req.body.password) {
        return res.status(400).send({ message: 'need nickname and password' })
    }

    const invalid = { message: 'Invalid nickanme and passoword combination' }
    // const user = await User.findOne({ nickname: req.body.nickname })
    //Nuevo comentario

    try {

        const user: any = await User.findOne({ nickname: req.body.nickname })
            .select('nickname email password rol name lastname session_init session_end duration')
            .exec()
        
        if (!user) {
            return res.status(401).send(invalid)
        }

        if (!selectRol(req.body.rol, user.rol)) {
            return res.status(500).json({
                message: `Ud. no es ${(rol[req.body.rol] || 'un rol definido')}`
            })
        }

        const match = await user.schema.methods.checkPassword(user, req.body.password)

        if (!match) {
            return res.status(401).send(invalid)
        }

        /** 
         * Registrar la hora de inicio de sesión 
         * */
        let userTime = new UserTime({
            start_time:moment().tz("America/Lima").format('DD/MM/YYYY - HH:mm:ss'),
            region:user.region,
            name_module:user.name_module,
            component:user.component
        })
        user.user_time = userTime._id

        await userTime.save()
        await user.save()

        const token = newToken(user)
        return res.status(201).json({
            user: user,
            token: token
        })

    } catch (e) {
        console.error(e)
        res.status(500).end()
    }
}