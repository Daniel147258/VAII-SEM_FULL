import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Kontext from './Kontext/Kontext';
import { GlobalProvider } from './Kontext/GlobalContext';
import { BreadcrumbProvider } from './Kontext/BreadcrumbContext';
import { ScrollToTopProvider } from './Kontext/ScollToTopContext';
import { UserProvider } from './Kontext/User';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <ScrollToTopProvider>
      <BreadcrumbProvider>
        <Kontext>
          <GlobalProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </GlobalProvider>
        </Kontext>
      </BreadcrumbProvider>
    </ScrollToTopProvider>
  </UserProvider>
  
  
);


reportWebVitals();
