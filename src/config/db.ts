
import consola from 'signale'
import mongoose from 'mongoose'

import options from './'

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const connectDB = (url = options.dbUrl, opts = dbOptions ) => {
  
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);


  mongoose.connection.on('connected', () => {
    consola.success('Data Base: ',options.database);
    clearTimeout(autoReconnectDB);
  })

  mongoose.connection.on('reconnected', function () {
    consola.info('reconnected');
  });

  mongoose.connection.on('disconnected', function() {
    consola.info('MongoDB disconnected!');
    clearTimeout(autoReconnectDB);
  });


  let count  = 0;
  const  autoReconnectDB = setInterval(async () => {
    try{
      await mongoose.connect(url, opts);
    }catch (e){
      consola.error(count );
      count++;
    }
  },2000)

    return  autoReconnectDB;
  }

export default connectDB ;
