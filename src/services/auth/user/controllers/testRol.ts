import { User } from '../models'
import catchAsync from '../../../../utils/catchAsync'

const testRol = catchAsync( 'Error in testRol controller',async (req, res, next) => {
    //console.log(req);
    const user = await User.findOne({nickname:req.body.nickname})
    //const user = await User.findOne({nickname:"superadmin2"})
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
    // console.log(req.user);
    next()
})

export { testRol }