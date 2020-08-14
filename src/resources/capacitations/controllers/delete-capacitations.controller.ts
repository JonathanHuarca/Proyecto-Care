import catchAsync from "../../../utils/catchAsync"

const errorMessage: String = "Error en delete capactations controller"

const deleteCapacitation = (Model) => catchAsync(errorMessage, async (req, res) => { 

    const capacitations = await Model.find()

    capacitations.forEach(async element => {
        await Model.findByIdAndRemove(element._id)
    });

    res.status(200).json({
        message: "Todas las capacitaciones borradas"
    })
})

export default deleteCapacitation