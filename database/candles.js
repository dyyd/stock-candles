class CandleStick {
  constructor(symbol, open, high, low, close, start, end) {
    this.symbol = symbol;
    this.open = open;
    this.high = high;
    this.low = low;
    this.close = close;
    this.start = start;
    this.end = end;
  }
}

class CandleStore {
  constructor() {
    this.candles = {};
  }

  addCandle(candle) {
    if (this.candles[candle.symbol]) {
      this.candles[candle.symbol].push(candle);
    } else {
      this.candles[candle.symbol] = [candle];
    }
  }

  getCandles(symbol) {
    return this.candles[symbol];
  }

  getSymbols() {
    return Object.keys(this.candles);
  }

  drop() {
    this.candles = {};
  }
}

module.exports = {
  CandleStore: new CandleStore(),
  CandleStick
};
