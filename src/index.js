import React from 'react';
import { render } from 'react-dom';
import '../dist/css/style.css';
import routes from './routes';

render(
  routes,
  document.getElementById('app'),
);
