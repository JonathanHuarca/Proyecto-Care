import * as controller from './controllers'
import { User, UserTime } from '../../services/auth/user/models/index'
import { Section, Module, UserModule, UserSection, LastSection, File, UserFile } from './models';
import ModelDownload from '../download/models'

const kpi = async (req, res, next) => {
  const fname = req.body.fname

  switch (fname) {
    case 'addSection':
      controller.addSection(Section, Module)(req, res, next)
      break;

    case 'getSection':
      controller.getSection(UserSection)(req, res, next)
      break;

    case 'getSections':
      controller.getSections(Module, Section, UserSection)(req, res, next)
      break;

    case 'editSection':
      controller.editSection(Section, File)(req, res, next)
      break;

    case 'deleteSection':
      controller.deleteSection(Section)(req, res, next)
      break;

    case 'getTemary':
      controller.getTemary(UserModule, UserSection)(req, res, next)
      break;

    case 'addModule':
      controller.addModule(Module, File)(req, res, next)
      break;

    case 'getModule':
      controller.getModule(Module)(req, res, next)
      break;

    case 'editModule':
      controller.editModule(Module, File)(req, res, next)
      break;

    case 'getModules':
      controller.getModules(Module, UserModule, UserSection)(req, res, next)
      break;

    case 'deleteModule':
      controller.deleteModule(Module,UserModule,Section, UserSection,File,UserFile,LastSection)(req, res, next)
      break;

    case 'publish':
      controller.publish(Module,UserModule,Section, UserSection,File,UserFile,LastSection)(req, res, next)
      break;

    case 'addResolve':
      controller.addResolve(UserSection)(req, res, next)
      break;

    case 'updateSection':
      controller.updateSection(UserSection, UserFile, LastSection)(req, res, next)
      break;

    case 'getKpi':
      controller.getKpi(User, UserModule, UserSection, UserFile, UserTime)(req, res, next)
      break;

    case 'addModuleToUser':
      controller.addModuleToUser(Module, UserModule, Section, UserSection)(req, res, next)
      break;

    case 'uploadFile':
      controller.uploadFile(UserSection, UserFile, File)(req, res, next)
      break;

    case 'editFile':
      controller.editFile(File)(req, res, next)
      break;

    case 'deleteFile':
      controller.deleteFile(File)(req, res, next)
      break;

    // <--updated------------
    case 'reportOfLastSections':
      console.time('time reportOfLastSections')
      controller.reportOfLastSections(User, UserSection, LastSection)(req, res, next)
      console.timeEnd('time reportOfLastSections')
      break;
    // deprecated
    case 'lastSectionReport':
      controller.reportOfLastSections(User, UserSection, LastSection)(req, res, next)
      break;
    //----------------------->
    case 'startOfActivity':
      controller.startOfActivity(UserSection, File, UserFile)(req, res, next)
      break;
    case 'getActivitiesPerRol':
      controller.getActivitiesPerRol(UserSection)(req, res, next)
      break;

    case 'inboxActivity':
      controller.inboxActivity(UserSection, ModelDownload)(req, res, next)
      break;

    default:
      res.status(500).json({
        message: 'Función no encontrada'
      })
      break;
  }
}

export default kpi