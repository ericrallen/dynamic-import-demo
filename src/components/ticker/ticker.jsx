import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TickerGraph from '../graph';

import TickerService from '../../services/ticker';

export default class Ticker extends Component {
  constructor(props) {
    super(props);

    const { symbols = [] } = props;

    this.Ticker = new TickerService(symbols);

    this.state = {
      tickerData: {},
      selectedTicker: null,
    };

    this.updateTickerData = this.updateTickerData.bind(this);
  }

  componentWillMount() {
    this.Ticker.connect(this.updateTickerData);
  }

  loadStockGraph(ticker) {
    console.log('CLICKED:', ticker);
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
    const { selectedTicker } = this.state;

    console.log('RENDER GRAPH:', selectedTicker);

    return (
      <TickerGraph symbol={selectedTicker} />
    );
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
