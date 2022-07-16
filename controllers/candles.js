const {getCandles} = require('../services/candleService');

// returns a JSON array of candle objects.
// Each candle object should have the following properties:
// - openPrice
// - highPrice
// - lowPrice
// - closePrice
// - startTime
// - endTime
function serialize(candles) {
  return candles.map((candle) => {
    return {
      openPrice: candle.open,
      highPrice: candle.high,
      lowPrice: candle.low,
      closePrice: candle.close,
      startTime: candle.start,
      endTime: candle.end
    };
  });
}

async function getCandlesForStock(ctx) {
  const { stock: queryStock } = ctx.query;
  if (!queryStock) {
    ctx.status = 400;
    ctx.body = 'Missing stock parameter';
    return;
  }
  const response = {};
  await Promise.all(queryStock.map(async (stock) => {
    const candles = await getCandles(stock);
    response[stock] = serialize(candles);
  }));
  ctx.body = response;
}


module.exports = {
  candleRoutes: (router) => {
    router.get('/candles', getCandlesForStock);
  }
};
