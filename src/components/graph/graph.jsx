import React from 'react';
import PropTypes from 'prop-types';
import { LineChart } from 'react-d3-components';

const mapTickerHistoryForLineChart = (symbol, history) => {
  const values = history.map(({
    date,
    minute,
    close,
    marketOpen,
  }) => {
    let parsedDate = new Date(date);

    if (parsedDate.toString() === 'Invalid Date') {
      const time = minute.split(':');

      parsedDate = new Date(date.substr(0, 4), date.substr(4, 2), date.substr(6, 2), time[0], time[1], '00');
    }

    return {
      x: parsedDate,
      y: (close !== null) ? close : marketOpen,
    };
  });

  return {
    label: `${symbol} History`,
    values,
  };
};

export default function StockGraph({ symbol, history }) {
  if (symbol && history.length) {
    return (
      <aside>
        <h3>
          {symbol}
          &nbsp;Performance
        </h3>
        <LineChart
          data={mapTickerHistoryForLineChart(symbol, history)}
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
      </aside>
    );
  }

  return null;
}

StockGraph.propTypes = {
  symbol: PropTypes.string.isRequired,
  history: PropTypes.arrayOf(PropTypes.any).isRequired,
};
