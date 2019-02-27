import React from 'react';

import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

import 'sanitize.css';

import './styles/app.scss';

render(
  (
    <Router>
      <Routes />
    </Router>
  ),
  document.getElementById('application-container'),
);
