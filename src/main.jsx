import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MethodUrlProvider } from './context/MethodUrlContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MethodUrlProvider>
    <App />
    </MethodUrlProvider>
  </React.StrictMode>,
)
