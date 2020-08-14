import mongoose from 'mongoose'
import catchAsync from "../../../utils/catchAsync";
import teacher from '../../user/admin.services';

const errorMessage: String = "Error en get teachers controller"

const getTeachers = Model => catchAsync(errorMessage, async (req, res) => {
    const id_manager = req.body.id_manager
    let all_teachers = []

    const teachers = await Model.findById(id_manager)

    if (!teachers)
        res.status(500).json({
            message: 'No se encontró al usuario'
        })

    teachers.teachers.forEach(async user => {
        let id = user.id_teacher

        let teacher_data = await Model.findById(id)

        all_teachers.push(teacher_data)

        if (all_teachers.length == teachers.teachers.length)
            res.status(200).json({
                message: `Profesores de ${teachers.nickname}`,
                teachers: all_teachers
            })
    });

})

export default getTeachers 