import color from 'chalk'

import { createLogger, format, transports } from 'winston'

// const options = {
//   file: {
//     level: 'info',
//     filename: `${__dirname}/../logs/log-api.log`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: true,
//   },
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false,
//     colorize: true,
//   },
// };

// const timezone:string = new Date().toLocaleString('en-US', {
//     timeZone: 'America/Lima'
//   });

// const loggerWinston = createLogger({
//     format: format.combine(
//       format.splat(),
//       format.simple(),
//       format.timestamp({
//         format:timezone
//       }),
//       format.ms(),
//       format.printf( info => {
//         const { level, message, ...args } = info;
//         if (level.indexOf('error') !== -1) {
//           console.log(typeof message, message);
//         }
//         return `[pid:${color.red(process.pid)}][${color.blue(info.timestamp)}] [${(color.green(info.message.remoteUser))}] ${(info.message.url)} ${(color.yellow(message.method))} ${(color.yellow(message.statusCode))} ${(info.message.remoteAddr)} ${info.message.userAgent} ${info.ms}`
//       })
//     ),
//   transports: [
//     new transports.File(options.file),
//     new transports.Console(options.console)
//   ],
//   exitOnError: false
// })

// create a stream object with a 'write' function that will be used by `morgan`
// loggerWinston.stream = {
//   write: function(message, encoding) {
//     const arr = message.split('|')
//     const data = {
//       method: arr[0],
//       url: arr[1],
//       userAgent: arr[2],
//       statusCode: arr[3],
//       remoteUser: arr[4].split('::ffff:')[1],
//       remoteAddr: arr[5]
//     }
//     loggerWinston.info(data, encoding);
//   },
// };

// loggerWinston.error = err => {
//   if (err instanceof Error) {
//     loggerWinston.log({ level: 'error', message: `${err.stack || err}` });
//   } else {
//     loggerWinston.log({ level: 'error', message: err });
//   }
// };


const logger = (req, res, next) => {
  const colorMethod = (method) => {
    let http;
    switch(method){
      case 'GET':
        http = color.green(method)
        break;
      case 'POST':
        http = color.yellow(method)
        break;
      case 'PUT':
        http = color.cyan(method)
        break;
      case 'DELETE':
        http = color.red(method)
        break;
    }
    return http;
  }
  if(process.env.NODE_ENV !== 'testing'){
    console.log(`${colorMethod(req.method)} ${res.statusCode} ${req.protocol}://${req.get('host')}${req.originalUrl} => [${color.magenta(req.body.fname)}]`)
  }
  next()
}

export default logger