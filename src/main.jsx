import React from 'react'
import { createRoot } from 'react-dom/client'
import AquaSenseView from './views/AquaSenseView.jsx'
import './styles/global.css'

createRoot(document.getElementById('root')).render(<React.StrictMode><AquaSenseView /></React.StrictMode>)
