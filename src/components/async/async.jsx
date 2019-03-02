import React, { Suspense } from 'react';

import Loading from '../loading';

export default function Async(Component) {
  return props => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
}
