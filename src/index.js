import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Kontext from './Kontext/Kontext';
import { GlobalProvider } from './Kontext/GlobalContext';
import { BreadcrumbProvider } from './Kontext/BreadcrumbContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BreadcrumbProvider>
  <Kontext>
    <GlobalProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GlobalProvider>
  </Kontext>
  </BreadcrumbProvider>
  
  
);


reportWebVitals();
