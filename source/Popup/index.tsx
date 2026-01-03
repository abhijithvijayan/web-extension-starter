import * as React from 'react';
import ReactDOM from 'react-dom/client';

import Popup from './Popup';

const container = document.getElementById('popup-root');

if (!container) {
    throw new Error("Could not find root container to mount the app");
}

const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>
);