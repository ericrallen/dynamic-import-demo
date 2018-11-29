import React, { Component } from 'react';

import Intro from '../components/intro';
import Ticker from '../components/ticker';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTicker: false,
    };

    this.toggleTicker = this.toggleTicker.bind(this);
  }

  toggleTicker() {
    const { showTicker } = this.state;

    this.setState({ showTicker: !showTicker });
  }

  renderTickerButton() {
    const { showTicker } = this.state;

    return (
      <button type="button" onClick={this.toggleTicker}>
        {(showTicker) ? 'Hide Ticker' : 'Show Ticker'}
      </button>
    );
  }

  render() {
    const { showTicker } = this.state;

    // TODO: add d3.js graph component below ticker

    return (
      <section>
        <Intro />
        {this.renderTickerButton()}
        {(showTicker) ? <Ticker /> : ''}
      </section>
    );
  }
}
