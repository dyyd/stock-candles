const expect = require('chai').expect;

describe('CandleStore', async () => {
  const {CandleStore, CandleStick} = require('../database/candles');

  before(async () => {
    CandleStore.drop();
  });

  afterEach(async () => {
    CandleStore.drop();
  });

  it('should create a new candle', async () => {
    const symbol = 'AAPL';
    const candle = new CandleStick(
        symbol, 100, 100, 100, 100, Date.now(), Date.now()
    );
    CandleStore.addCandle(candle);
    const candles = CandleStore.getCandles(symbol);
    expect(candles).to.exist;
    expect(candles.length).to.equal(1);
  });

  it('should get a candle', async () => {
    const symbol = 'AAPL';
    const testCandle = new CandleStick(
        symbol, 100, 100, 100, 100, Date.now(), Date.now()
    );
    CandleStore.addCandle(testCandle);
    const candles = CandleStore.getCandles(symbol);
    expect(candles).to.exist;
  });

  it('should get all candles for a symbol', async () => {
    const symbol = 'AAPL';
    const candle = new CandleStick(
        symbol, 100, 100, 100, 100, Date.now(), Date.now()
    );
    const candle2 = new CandleStick(
        symbol, 110, 110, 110, 110, Date.now(), Date.now()
    );
    CandleStore.addCandle(candle);
    CandleStore.addCandle(candle2);
    const candles = CandleStore.getCandles(symbol);
    expect(candles.length).to.equal(2);
  });
});
