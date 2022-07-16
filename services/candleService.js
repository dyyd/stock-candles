const { CandleStore, CandleStick } = require('../database/candles');
const { currentIntervalStart, nextIntervalStart } = require('../utils/time');
/*
  Find or create a candle for the given symbol

*/
async function updateCandles(symbol, timestamp, price) {
  const candles = await getCandles(symbol);
  if (candles.length === 0) {
    // create a new candle
    await createCandle(symbol, price, timestamp);
  } else {
    // check if latest candle is the time interval
    const latestCandle = candles[candles.length - 1];
    if (latestCandle.end < timestamp) {
      await createCandle(symbol, price, timestamp);
    } else {
      // update the last candle
      updateCandle(latestCandle, price);
    }
  }
}

async function createCandle(symbol, price, timestamp) {
  const newCandle = new CandleStick(
      symbol,
      price,
      price,
      price,
      price,
      currentIntervalStart(timestamp),
      nextIntervalStart(timestamp)
  );
  await CandleStore.addCandle(newCandle);
}

async function updateCandle(candle, price) {
  candle.close = price;
  if (price > candle.high) {
    candle.high = price;
  }
  if (price < candle.low) {
    candle.low = price;
  }
}

async function getSymbols() {
  return CandleStore.getSymbols() || [];
}

async function getCandles(symbol) {
  return CandleStore.getCandles(symbol) || [];
}

module.exports = {
  updateCandles,
  getCandles,
  getSymbols,
};
