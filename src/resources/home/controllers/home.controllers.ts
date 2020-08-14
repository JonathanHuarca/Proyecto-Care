import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error in home controller'

const home = catchAsync(msgErrorController, async (req, res, next) => {
  res.status(200).json({ 
    message: "API Care - Docker and Heroku",
    payload: req.payload,
   })
})

export { home }