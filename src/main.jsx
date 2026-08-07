import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './page/App.jsx'
import "./style/global.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
