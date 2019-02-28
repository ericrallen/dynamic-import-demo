import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import Intro from '../../components/intro';
import Gif from '../../components/gif';
import Nav from '../../components/nav';

const styles = require('../screen.scss');

const renderSubheading = (tag) => {
  if (tag) {
    return (
      <Fragment>
        All it does is show a random&nbsp;
        <code>{tag}</code>
        &nbsp;GIF.
      </Fragment>
    );
  }

  return null;
};

export default function Random() {
  const gifTag = 'Hackerman';

  return (
    <section className={styles.screen}>
      <Intro heading="Rarely Visited Route" subheading={renderSubheading(gifTag)} />

      <Nav>
        <Link to="/">&lt; Back</Link>
      </Nav>

      <Gif tag={gifTag} />
    </section>
  );
}
