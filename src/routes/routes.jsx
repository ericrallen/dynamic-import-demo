import React from 'react';

import { Route } from 'react-router-dom';

import Home from '../screens/home';
import Other from '../screens/other';

export default function Routes(props) {
  return (
    <React.Fragment>
      <Route exact path="/" key="defaultRoute" render={() => <Home {...props} />} />
      <Route path="/other" render={() => <Other {...props} />} />
    </React.Fragment>
  );
}
