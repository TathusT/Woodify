import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={'921964226366-p1oe7v8sk94h9j3v86pcc40v5ftgeu8h.apps.googleusercontent.com'}>
    <App />
  </GoogleOAuthProvider>
  // </React.StrictMode>,
)
