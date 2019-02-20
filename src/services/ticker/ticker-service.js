import io from 'socket.io-client';

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

  async history() {
    const response = await fetch(`${this.url}/${this.symbols[0].toLowerCase()}/chart/dynamic`).then(responseData => responseData.json());

    return response;
  }

  tick(handler) {
    const socket = io(this.url);

    // listen for data from socket
    socket.on('message', (data) => {
      const formattedData = JSON.parse(data);

      // return data to handler
      if (typeof handler === 'function') {
        handler(formattedData);
      }
    });

    // subscribe to tickers
    socket.on('connect', () => {
      socket.emit('subscribe', this.symbols.join(','));
    });
  }
}
