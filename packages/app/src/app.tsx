import './app.css';
import logo from './assets/icons/app-logo.svg';

import React, { JSX } from 'react';

export function App(): JSX.Element {
  return (
    <main>
      <h1>Algorithm Visualizer</h1>
      <img src={logo} width="100px" height="100px" alt="Algorithm Visualizer" />
      <p>Coming soon</p>
    </main>
  );
}
