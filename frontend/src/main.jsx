import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
//axios.defaults.baseURL = "http://localhost:5000"; 
axios.defaults.baseURL = "https://mcq-app-api.onrender.com/"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
