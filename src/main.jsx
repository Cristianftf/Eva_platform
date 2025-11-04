import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import global styles and Tailwind entry
import './styles/tailwind.css'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
