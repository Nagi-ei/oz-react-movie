import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import './index.css';
import { DarkModeProvider } from './context/DarkModeContext';
import { UserContextProvider } from './context/UserContext';
import { SupabaseProvider } from './hooks/useSupabaseAuth';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <UserContextProvider>
    <SupabaseProvider>
      <DarkModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DarkModeProvider>
    </SupabaseProvider>
  </UserContextProvider>
  // </StrictMode>
);
