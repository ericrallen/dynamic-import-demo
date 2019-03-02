import React, { Component, Fragment, lazy } from 'react';

import { Link } from 'react-router-dom';

import Intro from '../../components/intro';
import Nav from '../../components/nav';
import Async from '../../components/async';

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
