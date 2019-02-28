import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./nav.scss');

const renderListItems = items => items.map((item, index) => (
  // eslint-disable-next-line react/no-array-index-key
  <li key={`nav-item-${index}`}>
    {item}
  </li>
));

export default function Nav({ children }) {
  if (children) {
    const childrenToRender = Array.isArray(children) ? children : [children];

    return (
      <nav className={styles.nav}>
        <ul>
          {renderListItems(childrenToRender)}
        </ul>
      </nav>
    );
  }

  return null;
}

Nav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
};
