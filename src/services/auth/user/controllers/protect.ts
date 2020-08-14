import { User } from '../models'
import catchAsync from '../../../../utils/catchAsync'
import { verifyToken } from '../controllers'

const protect = catchAsync( 'Error in protect controller',async (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).end('Unauthorized')
    }

    const token = bearer.split('Bearer ')[1].trim()
    let payload

    payload = await verifyToken(token)
    // console.log(payload)

    const user = await User.findById(payload.id)
        //.select('-password')
        .select({
            register_signin : 0,
            sessions : 0
        })
        .lean()
        .exec()

    if (!user) {
        return res.status(401).end('User undefined')
    }

    req.user = user
    next()
})

export { protect }