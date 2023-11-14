import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Kontext from './Kontext/Kontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Kontext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Kontext>
);


reportWebVitals();
