import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import Popup from './Popup';

const container = document.getElementById('popup-root');

if (!container) {
  throw new Error('Could not find root container to mount the app');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <Popup />
  </StrictMode>
);
