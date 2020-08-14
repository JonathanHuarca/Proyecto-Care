import color from 'chalk'
// trace: err.stack.match(/\/([\/\w-_\.]+\.js):(\d*):(\d*)/),
const errorHandler = (err, req, res, next) => {
  const errorMsg = {
    SUCCESS: false,
    STATUSCODE: err.statusCode,
    MESSAGE: err.msg,
    DETAILS: err.details,
    FILENAME:err.stack.match(/[a-z.]+.js/)[0],
    LINE:err.stack.match(/:(\d*):(\d*)/)[0],
    PATH:err.stack.match(/[\/\w-_\.]+\.js/)[0]
  } 

  const statusColor = (code) => {
    let value;
    switch(code){
      case 500:
        value = color.red(code);
        break;
      case 200:
        value = color.green(code);
        break;
      case 304:
        value = color.yellow(code);
        break;
      default:
        value = color.gray(code);
        break;
    }
    return value
  }

  if(process.env.NODE_ENV !== 'testing'){
    console.log(`
    ${color.cyan('ERROR MESSAGE')} 
    
    ${color.yellow('SUCCESS')}    : ${color.red(errorMsg.SUCCESS)}
    ${color.yellow('SATUS CODE')} : ${statusColor(errorMsg.STATUSCODE)}
    ${color.yellow('MESSAGE')}    : ${color.cyan(errorMsg.MESSAGE)}
    ${color.yellow('DETAILS')}    : ${color.cyan(errorMsg.DETAILS)}
    ${color.yellow('FILENAME')}   : ${color.cyan(errorMsg.FILENAME)}
    ${color.yellow('PATH')}       : ${color.green(errorMsg.PATH)}
    ${color.yellow('LINE')}       : ${color.magenta(errorMsg.LINE)}
    `
    )
  }
  res.status(500).json(errorMsg)
  next()
}

export default errorHandler