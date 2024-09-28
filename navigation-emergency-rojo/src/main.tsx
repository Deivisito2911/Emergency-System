import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <PayPalScriptProvider
      options={{
        clientId: 'AVUOSysEf-jiGLf3QkekLdY2rrew6FbX6QyR04YDzncTDL6MwmzFfmTrJsnBZXk6HDL88MIJ-EdM6u8y', //ID del cliente desde el entorno
      }}
    >
      <App></App>
    </PayPalScriptProvider>
  </StrictMode>
);
