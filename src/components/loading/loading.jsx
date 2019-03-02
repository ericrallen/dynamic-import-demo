import React from 'react';

const styles = require('./loading.scss');

const loader = require('../../static/loader.gif');

export default function Loading() {
  return (
    <div className={styles.container}>
      <img src={loader} alt="Loading..." />
    </div>
  );
}
