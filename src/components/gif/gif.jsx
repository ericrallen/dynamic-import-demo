import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../button';
import Loading from '../loading';

import GifService from '../../services/gif';

const styles = require('./gif.scss');

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

    this.retrieveGif = this.retrieveGif.bind(this);
  }

  componentDidMount() {
    this.retrieveGif();
  }

  retrieveGif() {
    this.setState({ imageData: { images: {} } });

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
        <React.Fragment>
          <Button className={styles.button} label="Get a new GIF" action={this.retrieveGif} />

          <img className={styles.gif} src={url} height={height} width={width} alt=" " />
        </React.Fragment>
      );
    }

    return (
      <Loading />
    );
  }
}

Gif.propTypes = {
  tag: PropTypes.string,
};

Gif.defaultProps = {
  tag: '',
};
