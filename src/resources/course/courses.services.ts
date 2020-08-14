import { Course } from './models'
import * as controller from './controllers'

const teacher = async (req, res, next) => {
    const fname = req.body.fname
    switch (fname) {
        case 'addCourse':
            controller.addCourse(Course)(req, res, next)
            break;
        case 'getCourse':
            controller.getCourse(Course)(req, res, next)
            break;
        default:
            controller.notFound(req, res, next)
            break;
    }
}

export default teacher