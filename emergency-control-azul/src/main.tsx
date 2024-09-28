import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap Bundle JS (includes Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Import your global styles after Bootstrap to ensure they can override Bootstrap styles
import './styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
