import jwt from 'jsonwebtoken'

import config from '../../../../config'
import catchAsync from '../../../../utils/catchAsync'
import { User } from '../models/'

const newToken = user => {
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
    })
}

const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })

const msg = 'Error en controlador signup'
const signup = catchAsync(msg, async (req, res) => {
    const user_rol = parseInt(req.body.user_rol)
    const nickname = req.body.nickname
    const userExists = await User.findOne({ nickname: nickname })

    if (!req.body.nickname || !req.body.password) {
        return res.status(400).send({ message: 'need nickname and password or rol unauthorized' })
    }
    if (userExists) return res.status(400).json({
        message: 'nickname ya está en uso'
    })

    if (user_rol !== 1) return res.status(400).json({
        message: 'Rol no permitido'
    })

    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ user, token })
})

export { newToken, verifyToken, signup }
