import { Student } from './models';
import * as controller from './controllers'

const studentService = async (req, res, next) => {
    const fname = req.body.fname
    switch (fname) {

        case 'createStudent':
            controller.createSudent(Student)(req, res, next)
            break;
        case 'createStudent_excel':
            controller.createStudentsExcel(Student)(req, res, next)
            break
            
        // case 'addCourse':
        //     addCourse(User)(req, res, next)
        //     break;
        
        case 'deleteStudent':
            controller.deleteStudent(Student)(req, res, next)
            break;

        case 'getStudent':
            controller.getStudent(Student)(req, res, next)
            break;

        case 'updateStudent':
            controller.updateStudent(Student)(req, res, next)
            break;
        
        case 'getStudents':
            controller.getStudents(Student)(req, res, next);
            break

        default:
            controller.notFound(req, res, next)
            break;
    }
}

export default studentService