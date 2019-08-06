const { init, createLogger } = require('./src/lib/Client.js');

if (process.env.NODE_ENV === 'development') {
  init(process.env.DEV_TOKEN).catch(e => console.log(e));
} else {
  init(process.env.PROD_TOKEN).catch(e => console.log(e));
  createLogger();
}