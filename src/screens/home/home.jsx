import React, { Component, Fragment, lazy } from 'react';

import { Link } from 'react-router-dom';

import Async from '../../components/async';
import Intro from '../../components/intro';
import Nav from '../../components/nav';

import lazyWithPreload from '../../utils/lazy-with-preload';

// allow us to preload our lazy Component when we're ready
const LazyTickerGraph = lazyWithPreload(() => import(/* webpackChunkName: "ticker-graph" */ '../../components/graph'));

// lazy load the Ticker Component
const Ticker = Async(lazy(() => import(/* webpackChunkName: "ticker" */ '../../components/ticker')));

const styles = require('../screen.scss');

const renderSubheading = () => (
  <Fragment>
    We will explore some usecases for
    &nbsp;
    <code>React.lazy()</code>
    &nbsp;
    and dynamic
    &nbsp;
    <code>import</code>
    s below.
  </Fragment>
);

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

    // preload our TickerGraph bundle so it's ready when the user wants to interact with it
    LazyTickerGraph.preload();
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

    return (
      <section className={styles.screen}>
        <Intro heading="Dynamic Import Demo" subheading={renderSubheading()} />

        <Nav>
          <Link to="/other">Get a Random GIF</Link>
          {this.renderTickerButton()}
        </Nav>

        {(showTicker) ? <Ticker /> : ''}

      </section>
    );
  }
}
