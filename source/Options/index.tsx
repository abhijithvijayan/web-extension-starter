import * as React from 'react';
import ReactDOM from 'react-dom/client';

import Options from './Options';

const container = document.getElementById('options-root');

if (!container) {
    throw new Error("Could not find root container to mount the app");
}

const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <Options />
    </React.StrictMode>
);