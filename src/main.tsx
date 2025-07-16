import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/ReusableComponents/theme-provider.tsx'
import { UserProvider } from './Constants/userContext.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="606462131974-qlghb2fuakm3gdsechgp392q34dak0ta.apps.googleusercontent.com">
      <UserProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <App/>
        </ThemeProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
