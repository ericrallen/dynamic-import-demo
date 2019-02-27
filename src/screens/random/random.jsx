import React from 'react';

import { Link } from 'react-router-dom';

import Gif from '../../components/gif';

export default function Random() {
  const gifTag = 'Hackerman';

  return (
    <section>
      <h1>This is a rarely visited route.</h1>

      <p>
        All it does is show a random&nbsp;
        <code>{gifTag}</code>
        &nbsp;GIF.
      </p>

      <Gif tag={gifTag} />

      <Link to="/">Back to Demo Homepage</Link>
    </section>
  );
}
