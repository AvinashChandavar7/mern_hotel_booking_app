import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx'
import './index.css'

import { QueryProvider } from './lib/QueryProvider.tsx';
import { AppContextProvider } from './contexts/AppContext.tsx';
import { SearchContextProvider } from './contexts/SearchContext.tsx';
import { ThemeContextProvider } from './contexts/ThemeContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <ThemeContextProvider>
          <AppContextProvider>
            <SearchContextProvider>
              <App />
            </SearchContextProvider>
          </AppContextProvider>
        </ThemeContextProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
