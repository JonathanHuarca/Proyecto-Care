import catchAsync from "../../../utils/catchAsync"

const errorMessage: String = "error en set capacitation controller"

const setCapacitation = (Model) => catchAsync(errorMessage, async (req, res) => {

    const { title, link, password, directed_to } = req.body
    const id_admin = req.user._id
    
    let capacitation = await Model.findOne({ created_by: id_admin })

    if (capacitation) {
        capacitation.title = title || capacitation.title
        capacitation.link = link || capacitation.link
        capacitation.password = password || capacitation.password
        capacitation.directed_to = directed_to || capacitation.directed_to
    } else {
        capacitation = new Model({
            title: title,
            link: link,
            password: password,
            directed_to: directed_to,
            created_by: id_admin
        })
    }

    await capacitation.save()

    res.status(200).json({
        message: `Capacitación establecida`,
        capacitation: capacitation
    })
})

export default setCapacitation