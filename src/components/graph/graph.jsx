import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LineChart } from 'react-d3-components';

import TickerService from '../../services/ticker';

const TICKER_HISTORY_URL = 'https://api.iextrading.com/1.0/stock';

export default class StockGraph extends Component {
  constructor(props) {
    super(props);

    console.log('GRAPH:', props);

    this.state = {
      history: [],
      ticker: props.symbol,
    };
  }

  componentDidMount() {
    const { ticker } = this.state;

    this.Ticker = new TickerService([ticker], TICKER_HISTORY_URL);

    this.Ticker.history().then(history => this.setState({ history }));
  }

  mapTickerHistoryForLineChart() {
    const { history, ticker } = this.state;

    const values = history.map(({ date, close }) => ({
      x: new Date(date),
      y: close,
    }));

    return {
      label: `${ticker} History`,
      values,
    };
  }

  render() {
    const { symbol } = this.props;
    const { history } = this.state;

    if (symbol && history.length) {
      return (
        <LineChart
          data={this.mapTickerHistoryForLineChart()}
          width={600}
          height={450}
          xAxis={{ label: 'Date' }}
          yAxis={{ label: 'Price (USD)' }}
          margin={{
            top: 50,
            right: 50,
            left: 50,
            bottom: 50,
          }}
        />
      );
    }

    return null;
  }
}

StockGraph.propTypes = {
  symbol: PropTypes.string.isRequired,
};
