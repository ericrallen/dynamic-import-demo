import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TickerGraph from '../graph';

import TickerService from '../../services/ticker';

const TICKER_HISTORY_URL = 'https://api.iextrading.com/1.0/stock';

export default class Ticker extends Component {
  constructor(props) {
    super(props);

    const { symbols = [] } = props;

    this.Ticker = new TickerService(symbols);

    this.state = {
      tickerData: {},
      selectedTicker: null,
      tickerHistory: {},
    };

    this.updateTickerData = this.updateTickerData.bind(this);
  }

  componentWillMount() {
    this.Ticker.connect(this.updateTickerData);
  }

  loadStockGraph(ticker) {
    this.setState({
      selectedTicker: ticker,
    });
  }

  updateTickerData(ticker) {
    const { tickerData: previousTickerData } = this.state;

    const thisTicker = {
      [ticker.symbol]: ticker.lastSalePrice,
    };

    const tickerData = Object.assign({}, previousTickerData, thisTicker);

    this.setState({ tickerData });
  }

  renderTickerGraph() {
    const { selectedTicker, tickerHistory } = this.state;

    if (!tickerHistory[selectedTicker]) {
      const history = new TickerService([selectedTicker], TICKER_HISTORY_URL);

      history.history().then(({ data }) => {
        const { tickerHistory: oldTickerHistory } = this.state;

        const newTickerHistory = Object.assign({}, oldTickerHistory, { [selectedTicker]: data });

        this.setState({ tickerHistory: newTickerHistory });
      });
    }

    if (selectedTicker && tickerHistory[selectedTicker]) {
      return (
        <TickerGraph symbol={selectedTicker} history={tickerHistory[selectedTicker]} />
      );
    }

    return null;
  }

  renderTicker() {
    const { tickerData } = this.state;

    return Object.keys(tickerData).map(ticker => (
      <li key={`ticker-${ticker}`}>
        <button type="button" onClick={this.loadStockGraph.bind(this, ticker)}>
          <strong>{ticker}</strong>
          : $
          {tickerData[ticker]}
        </button>
      </li>
    ));
  }

  render() {
    const { selectedTicker } = this.state;

    return (
      <article>
        <h2>Trending Stocks</h2>
        <ul>

          {this.renderTicker()}

        </ul>

        {selectedTicker && this.renderTickerGraph()}

      </article>
    );
  }
}

Ticker.propTypes = {
  symbols: PropTypes.arrayOf(PropTypes.string),
};

Ticker.defaultProps = {
  symbols: [],
};
