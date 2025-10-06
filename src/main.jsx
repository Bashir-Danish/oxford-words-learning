import React from 'react'
import ReactDOM from 'react-dom/client'
import AppNew from './AppNew.jsx'
import './index.css'
import { autoCleanup } from './utils/cleanupLocalStorage'

// Clean up old localStorage data on app start
autoCleanup();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppNew />
  </React.StrictMode>,
)
