import React from 'react';
import PropTypes from 'prop-types';


export default function Button({
  action,
  label,
  type,
  ...otherProps
}) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} onClick={action} {...otherProps}>
      {label}
    </button>
  );
}

Button.propTypes = {
  action: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
};
