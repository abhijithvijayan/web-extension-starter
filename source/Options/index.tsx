import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import Options from './Options';

const container = document.getElementById('options-root');

if (!container) {
  throw new Error('Could not find root container to mount the app');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <Options />
  </StrictMode>
);
