import React from 'react';

import { Route } from 'react-router-dom';

import Home from '../screens/home';
import Random from '../screens/random';

export default function Routes(props) {
  return (
    <React.Fragment>
      <Route exact path="/" key="defaultRoute" render={() => <Home {...props} />} />
      <Route path="/other" render={() => <Random {...props} />} />
    </React.Fragment>
  );
}
