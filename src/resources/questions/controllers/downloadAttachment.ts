import catchAsync from "../../../utils/catchAsync";

const errorMessage: String = "Error en controlado download attatchment question"

const download = () => catchAsync(errorMessage, async (req, res) => { 
    const {name_file,pathURL} = req.body
    res.attachment(name_file)
    res.send(pathURL)
})

export default download