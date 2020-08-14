import express from 'express';
import user from './resources/user'
import home from './resources/home/home.router'
import student from './resources/students'
import teacher from './resources/teacher'
import course from './resources/course'
import gestor from './resources/gestor'
import question from './resources/questions'
import kpi from './resources/kpi'
import report from './resources/reports'
import adviser from './resources/adviser'
import pdf from './resources/pdf'
import logout from './resources/session'
import section from './resources/section'
import forum from './resources/Forum'
import email from './resources/emails'
import ads from './resources/ads'
import capacitation from './resources/capacitations'

import download from './resources/download'

const router = express()

/** version 2.x */

router.use('/home', home)
router.use('/teacher', teacher)
router.use('/course', course)
router.use('/student', student)
router.use('/gestor', gestor)
router.use('/question', question)
router.use('/kpi', kpi)
router.use('/question', question)
router.use('/report', report)
router.use('/adviser', adviser)
router.use('/pdf', pdf)
router.use('/logout', logout)
router.use('/forum',forum)
router.use('/email',email)
router.use('/ad', ads)
router.use('/capacitation', capacitation)
//router.use('/download',download)

/**updated */
router.use('/user', user)
router.use('/section',section)

/** Deprecated */
router.use('/admin', user)
router.use('/activity',section)




export default router


