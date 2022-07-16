const expect = require('chai').expect;

describe('Candle Service', () => {
  const CandleService = require('../services/candleService');

  it('should create a new candle', async () => {
    // verify there are no candles for the symbol
    const symbol = 'AAPL';
    const candles = await CandleService.getCandles(symbol);
    expect(candles).to.be.empty;
    // pass a stock change to the candle service
    const timestamp = Date.now();
    const price = 100;
    await CandleService.updateCandles(symbol, timestamp, price);
    // verify there is now a candle for the symbol
    const candles2 = await CandleService.getCandles(symbol);
    expect(candles2).to.exist;
    expect(candles2.length).to.equal(1);
  });
});
