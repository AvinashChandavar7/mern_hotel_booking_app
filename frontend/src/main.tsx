import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx'
import './index.css'

import { QueryProvider } from './lib/QueryProvider.tsx';
import { AppContextProvider } from './contexts/AppContext.tsx';
import { SearchContextProvider } from './contexts/SearchContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AppContextProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </AppContextProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
