import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GifService from '../../services/gif';

export default class Gif extends Component {
  constructor(props) {
    super(props);

    const { tag } = props;

    this.state = {
      imageData: {
        images: {},
      },
    };

    const serviceConfig = { tag };

    this.service = new GifService(serviceConfig);
  }

  componentWillMount() {
    this.service.get().then(({ data: imageData }) => {
      this.setState({ imageData });
    });
  }

  render() {
    const { imageData: { images } } = this.state;

    if (images.downsized_large) {
      const {
        url,
        width,
        height,
      } = images.downsized_large;

      return (
        <img src={url} height={height} width={width} alt=" " />
      );
    }

    return null;
  }
}

Gif.propTypes = {
  tag: PropTypes.string,
};

Gif.defaultProps = {
  tag: '',
};
