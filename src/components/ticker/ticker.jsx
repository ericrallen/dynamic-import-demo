import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TickerService from '../../services/ticker';

export default class Ticker extends Component {
  constructor(props) {
    super(props);

    const { symbols = [] } = props;

    this.Ticker = new TickerService(symbols);

    this.state = {
      tickerData: {},
    };

    this.updateTickerData = this.updateTickerData.bind(this);
  }

  componentWillMount() {
    this.Ticker.connect(this.updateTickerData);
  }

  updateTickerData(ticker) {
    const { tickerData: previousTickerData } = this.state;

    const thisTicker = {
      [ticker.symbol]: ticker.lastSalePrice,
    };

    const tickerData = Object.assign({}, previousTickerData, thisTicker);

    this.setState({ tickerData });
  }

  renderTicker() {
    const { tickerData } = this.state;

    return Object.keys(tickerData).map(ticker => (
      <li key={`ticker-${ticker}`}>
        <strong>{ticker}</strong>
        : $
        {tickerData[ticker]}
      </li>
    ));
  }

  render() {
    return (
      <article>
        <h2>Trending Stocks</h2>
        <ul>
          {this.renderTicker()}
        </ul>
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
