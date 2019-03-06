import io from 'socket.io-client';

// TODO: Change this demo to use the new IEX Cloud API
// The old API we are using here will sunset on 2019-06-01.

const SOCKET_URL = 'https://ws-api.iextrading.com/1.0/tops';

const DEFAULT_SYMBOLS = [
  'ALLY',
  'BAC',
  'LOW',
  'MSFT',
  'WFC',
];

export default class TickerService {
  constructor(symbols, url = SOCKET_URL) {
    this.symbols = (symbols && symbols.length) ? symbols : DEFAULT_SYMBOLS;
    this.url = url;
  }

  connect(handler) {
    this.tick(handler);
  }

  disconnect() {
    this.socket.disconnect();
  }

  async history() {
    const response = await fetch(`${this.url}/${this.symbols[0].toLowerCase()}/chart/dynamic`).then(responseData => responseData.json());

    return response;
  }

  tick(handler) {
    this.socket = io(this.url);

    // listen for data from socket
    this.socket.on('message', (data) => {
      const formattedData = JSON.parse(data);

      // return data to handler
      if (typeof handler === 'function') {
        handler(formattedData);
      }
    });

    // subscribe to tickers
    this.socket.on('connect', () => {
      this.socket.emit('subscribe', this.symbols.join(','));
    });
  }
}
