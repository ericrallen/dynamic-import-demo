import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';

import Async from '../async';
import Button from '../button';

import TickerService from '../../services/ticker';

// allow us to preload our lazy Component when we're ready
const TickerGraph = Async(lazy(() => import(/* webpackChunkName: "ticker-graph" */ '../graph')));

const styles = require('./ticker.scss');

const generateTickerLabel = (symbol, price) => (
  <React.Fragment>
    <strong>{symbol}</strong>
    :&nbsp;$
    {price}
  </React.Fragment>
);

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
    this.loadStockGraph = this.loadStockGraph.bind(this);
  }

  componentDidMount() {
    this.Ticker.connect(this.updateTickerData);
  }

  componentWillUnmount() {
    this.Ticker.disconnect();
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
      const history = new TickerService([selectedTicker], process.env.TICKER_HISTORY_URL);

      history.history().then(({ data }) => {
        const { tickerHistory: oldTickerHistory } = this.state;

        const newTickerHistory = Object.assign({}, oldTickerHistory, { [selectedTicker]: data });

        this.setState({ tickerHistory: newTickerHistory });
      });
    }

    if (selectedTicker && tickerHistory[selectedTicker]) {
      return (
        // we still need <Suspense /> just in case the user tries to load this before
        // we have downloaded and processed its chunk
        <TickerGraph symbol={selectedTicker} history={tickerHistory[selectedTicker]} />
      );
    }

    return null;
  }

  renderTicker() {
    const { tickerData } = this.state;

    if (tickerData) {
      return Object.keys(tickerData).map(ticker => (
        <li className={styles.listItem} key={`ticker-${ticker}`}>
          <Button
            className={styles.button}
            label={generateTickerLabel(ticker, tickerData[ticker])}
            action={() => this.loadStockGraph(ticker)}
          />
        </li>
      ));
    }

    return null;
  }

  render() {
    const { selectedTicker } = this.state;

    return (
      <main className={styles.container}>
        <article className={styles.ticker}>
          <h2>Trending Stocks</h2>

          <ul className={styles.list}>
            {this.renderTicker()}
          </ul>
        </article>

        <aside className={styles.graph}>
          {selectedTicker && this.renderTickerGraph()}
        </aside>

      </main>
    );
  }
}

Ticker.propTypes = {
  symbols: PropTypes.arrayOf(PropTypes.string),
};

Ticker.defaultProps = {
  symbols: [],
};
