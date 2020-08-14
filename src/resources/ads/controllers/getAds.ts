import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en new AD controlador'

const newAd = Model => catchAsync(msgErrorController, async (req, res, next) => {
    const ads = await Model.find().sort({createdAt:-1})
    res.status(200).json({
        message : "Anuncios encontrados :",
        ads : ads 
    })

})

export default  newAd 