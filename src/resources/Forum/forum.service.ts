import { User } from "../../services/auth/user/models"
import {forumModel} from './model'
import {UserSection} from '../section/models/index'
import * as controller from './controllers'

const forumService = async (req, res, next) => { 
    const fname = req.body.fname

    switch (fname) {
        case 'joinForum':
            controller.joinForum(User,forumModel,UserSection)(req,res,next)
            break;
        case 'addQuestion':
            controller.addQuestion(User,forumModel)(req,res,next)
            break;
        case 'getTeacherForum':
            controller.getTeacherForum(User,forumModel)(req,res,next)
            break;
        case 'addAnswer':
            controller.addAnswer(User,forumModel)(req,res,next)
            break;
    
        default:
            break;
    }
}

export default forumService