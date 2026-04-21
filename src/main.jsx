import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SheetsProvider } from './context/SheetsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SheetsProvider>
      <App />
    </SheetsProvider>
  </StrictMode>,
)
