const {getSymbols} = require('../services/candleService');

async function getStockSymbols(ctx) {
  const symbols = await getSymbols();
  ctx.body = { symbols };
}


module.exports = {
  stockRoutes: (router) => {
    router.get('/stocks', getStockSymbols);
  }
};
