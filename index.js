const Koa = require('koa');
const KoaRouter = require('koa-router');
const { candleRoutes } = require('./controllers/candles');
const { stockRoutes } = require('./controllers/stocks');
const StockListner = require('./services/stockListner');
const { stockServerHost, port = 8080 } = require('./config');

const router = new KoaRouter();

candleRoutes(router);
stockRoutes(router);

const app = new Koa();
app.use(router.routes());

// Start stock listner service
const stockListner = new StockListner(stockServerHost);
let server;
try {
  stockListner.start();
  server = app.listen(port);
  console.log('Started HTTP service on port ' + port);
} catch (err) {
  stockListner.stop();
  if (server) {
    server.stop();
  }
}

module.exports = {
  server
};
