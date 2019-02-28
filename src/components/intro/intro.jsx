import React from 'react';
import PropTypes from 'prop-types';

export default function Intro({ heading, subheading }) {
  return (
    <header>
      <h1>{heading}</h1>

      {subheading && <p>{subheading}</p>}
    </header>
  );
}

Intro.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object]),
};

Intro.defaultProps = {
  subheading: null,
};
