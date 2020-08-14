import * as controller from "./controllers"

const pdf = async (req, res, next) => {
    const fname = req.body.fname

    switch (fname) {
        case 'getPDF':
            controller.pdf(req, res, next)
            break;

        default:
            res.status(500).json({
                message: 'No se encontró la función'
            })
            break;
    }
}

export default pdf