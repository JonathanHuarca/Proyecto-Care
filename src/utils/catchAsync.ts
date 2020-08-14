import ErrorResponse from './errorResponse'

const catchAsync = (msg, fn) => {
  return(req:any, res:any, next:any) => {
    fn(req, res, next).catch((err) => {
      ErrorResponse(err, msg, 500)
      next(err)
    })
  }
}

export default catchAsync