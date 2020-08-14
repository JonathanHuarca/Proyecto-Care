import catchAsync from "../../../utils/catchAsync"

const errorMessage: String = "error en get capacitation controller"

const getCapacitation = (Model) => catchAsync(errorMessage, async (req, res) => {
    const id_teacher = req.user._id

    const capacitations = await Model.find().sort({ updatedAt: 'descending' });

    capacitations.forEach(capacitation => {
        capacitation.directed_to.forEach(user => {
            // Verificar si fue convocado
            if (user === id_teacher.toString()) { 
                return res.status(200).json({
                    message: "Capacitación encontrada",
                    capacitation: {
                        title: capacitation.title,
                        link: capacitation.link,
                        password: capacitation.password,
                    }
                }) 
            }
        });
    });

    res.status(500).json({
        message: "El usuario no ha sido convocado",
    })

})

export default getCapacitation