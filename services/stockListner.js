const {updateCandles} = require('../services/candleService');
const WebSocket = require('ws');
/**
 * Service that listens to the stock changes and updates the stock candles
 */
class StockListner {
  constructor(host) {
    this.host = host;
  }

  start() {
    // open websocket connection to the stock server
    this.ws = new WebSocket(this.host);
    this.ws.on('open', () => {
      console.log('Connected to stock server');
    });
    this.ws.on('close', () => {
      console.log('Disconnected from stock server');
    });
    this.ws.on('message', (event) => {
      const data = JSON.parse(event);
      const {s: symbol, t: timestamp, p: price} = data;
      // pass the stock change to the candle service
      updateCandles(symbol, timestamp, parseFloat(price));
    });
  }

  stop() {
    // close websocket connection to the stock server
    if (this.ws) {
      this.ws.close();
    }
  }
}

module.exports = StockListner;
