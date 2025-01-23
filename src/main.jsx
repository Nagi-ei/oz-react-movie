import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { DarkModeProvider } from './context/DarkModeContext.jsx';
import { SupabaseProvider } from './hooks/useSupabaseAuth';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <SupabaseProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </SupabaseProvider>
  </BrowserRouter>
  // </StrictMode>
);
