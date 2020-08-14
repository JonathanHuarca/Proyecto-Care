import Question from './models';
import modelDownload from '../download/models'
import * as controller from './controllers'
import { User } from '../../services/auth/user/models';

const question = async (req, res, next) => {
    const fname = req.body.fname
    const rol = req.user.rol
    switch (fname) {
        case 'addQuestion':
            if (rol === 5 || rol === 4) {
                controller.addQuestion(Question,modelDownload)(req, res, next)
            } else {
                res.status(401).json({
                    message: 'Rol no permitido'
                })
            }
            break;

        case 'answerQuestion':
            controller.answerQuestion(Question,modelDownload)(req, res, next)
            break

        case 'getQuestionHistory':
            controller.getQuestionHistory(Question)(req, res, next)
            break;

        case 'getQuestions':
            controller.getQuestions(Question)(req, res, next)
            break;
        case 'download' :
            controller.downloadAttachment()(req,res,next)
            break;
        
        case 'getQuestionForo':
            controller.getQuestionForo(Question, User)(req, res, next)
            break;
        case 'getRankingQuestion':
            if(rol === 7 || rol === 0 || rol === 1){
                controller.getRanking(Question,User)(req, res, next)
            }else{
                res.status(401).json({
                    message : "Rol no permitido"
                })
            }            
            break;
        
        default:
            res.status(500).json({
                message: 'Función no encontrada'
            })
            break;
    }

}

export default question