import catchAsync from "../../../utils/catchAsync"

const documentation = catchAsync('Error documentacion', async (req, res, next) => { 
    res.render('index')
})

export { documentation }