import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/ReusableComponents/theme-provider.tsx'
import { UserProvider } from './Constants/userContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <App/>
      </ThemeProvider>
    </UserProvider>
  </StrictMode>,
)
