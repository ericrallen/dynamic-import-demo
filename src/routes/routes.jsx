import React from 'react';

import { Route } from 'react-router-dom';

import Home from '../screens/home';

export default function Routes(props) {
  // TODO: add route that can be lazy loaded

  return (
    <React.Fragment>
      <Route exact path="/" key="defaultRoute" render={() => <Home {...props} />} />
    </React.Fragment>
  );
}
