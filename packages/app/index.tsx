import { App } from './src/app';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const applicationContainer = document.getElementById('react-app');

if (applicationContainer) {
  const root = createRoot(applicationContainer);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
